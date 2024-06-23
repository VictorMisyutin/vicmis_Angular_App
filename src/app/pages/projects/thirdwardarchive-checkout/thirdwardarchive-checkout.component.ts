import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-thirdwardarchive-checkout',
  templateUrl: './thirdwardarchive-checkout.component.html',
  styleUrls: ['./thirdwardarchive-checkout.component.css']
})
export class ThirdwardarchiveCheckoutComponent implements OnInit {
  checkoutForm!: FormGroup; // Ensure the form is initialized in ngOnInit

  constructor(private fb: FormBuilder, private http: HttpClient, private apiService: ApiService) {}

  storedCart: any;
  cart_ids: string[] = [];
  cart_quantities: number[] = [];
  productMap = new Map<string, string[]>();

  productImageUrls: string[] = [];
  productInfo: string[][] = [];

  totalSum: number = 0;

  ngOnInit(): void {
    this.updateDisplay();
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.pattern('^[A-Z]{2}$')]], // Assuming state is a 2-letter code
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]], // 5 or 9 digit zip code
      phone: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]], // E.164 international phone number format
      emailUpdates: [false],
      textUpdates: [false],
    });
  }

  updateDisplay(){
    // reset vars
    this.cart_ids = [];
    this.cart_quantities = [];
    this.productMap = new Map<string, string[]>();

    this.productImageUrls = [];
    this.productInfo = [];
    this.totalSum = 0;

    this.storedCart = localStorage.getItem("cart");
    if (this.storedCart) {
      let data = JSON.parse(this.storedCart);
      // console.log(`Product ID: ${item.id}, Quantity: ${item.quantity}`);
      data.forEach((item: { id: string; quantity: number }) => {
        this.cart_ids.push(item.id);
        this.cart_quantities.push(item.quantity);
      });
    }
    this.fetchProducts();
  }

  fetchProducts() {
    Promise.all([this.fetchImages(), this.fetchInfo()]).then(() => {
      this.combineData();
    });
  }

  fetchImages(): Promise<void> {
    const imagePromises = this.cart_ids.map(id => {
      return new Promise<void>((resolve, reject) => {
        this.http.get(`https://vicmis.com/api/get-product-image/${id}/0`, { responseType: 'blob' }).subscribe(
          (response) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.productImageUrls.push(reader.result as string);
              resolve();
            };
            reader.readAsDataURL(response);
          },
          (error) => {
            console.error('Error fetching images', error);
            reject(error);
          }
        );
      });
    });

    return Promise.all(imagePromises).then(() => undefined);
  }

  fetchInfo(): Promise<void> {
    const infoPromises = this.cart_ids.map((id, index) => {
      return new Promise<void>((resolve, reject) => {
        this.http.get<string[]>(`https://vicmis.com/api/get-product-info/${id}`).subscribe(
          (response) => {
            this.productInfo.push([this.cart_quantities[index].toString(), ...response]);
            resolve();
          },
          (error) => {
            console.error('Error fetching information', error);
            reject(error);
          }
        );
      });
    });

    return Promise.all(infoPromises).then(() => undefined);
  }

  combineData() {
    this.cart_ids.forEach((id, index) => {
      const info = this.productInfo[index];
      const imageUrl = this.productImageUrls[index];
      let price = this.cart_quantities[index] * Number(info[2]);
      price = Math.round(price * 100) / 100
      if (info && imageUrl) {
        this.productMap.set(id, [...info, imageUrl, price.toString()]);
        this.totalSum += price;
      }
    });
  }

  removeProduct(prodId: string){
    let currentCart = localStorage.getItem('cart');
    let cartArray = currentCart ? JSON.parse(currentCart) : [];
  
    const index = cartArray.findIndex((item: { id: string; quantity: number }) => item.id === prodId);
  
    if (index !== -1) {
      if (cartArray[index].quantity > 1) {
        cartArray[index].quantity -= 1;
      } else {
        cartArray.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.updateDisplay();
    }
  }

  addProduct(prodId: string){
    let currentCart = localStorage.getItem('cart');
    let cartArray = currentCart ? JSON.parse(currentCart) : [];
  
    let productInCart = cartArray.find((item: { id: string; quantity: number }) => item.id === prodId);
  
    productInCart.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartArray));
    this.updateDisplay();

  }


  // saveShippingInfo(shippingData: any): void {
  //   this.http.post('/api/shipping', shippingData).subscribe(response => {
  //     console.log('Shipping information saved', response);
  //   });
  // }

  loading = false; // Flag to track loading state

  checkout() {
    if (this.checkoutForm?.valid) {
      this.loading = true;

      // Simulate a delay for demonstration purposes (replace with actual form submission logic)
      setTimeout(() => {
        console.log('Form is valid and submitted:', this.checkoutForm.value);

        // Reset form and loading flag after submission
        this.checkoutForm.reset();
        this.loading = false;
      }, 2000); // Simulated 2 seconds delay

      // this.saveShippingInfo(this.checkoutForm.value);
      document.getElementById('processing')?.classList.remove('hidden');
      document.getElementById('processing')?.classList.add('processing-shown');
      document.getElementById('main-cart-area')?.classList.remove('main-cart-area');
      document.getElementById('main-cart-area')?.classList.add('hidden');

      this.apiService.updateEmailAndTextList(this.checkoutForm.value['firstName'],this.checkoutForm.value['lastName'], this.checkoutForm.value['email'], this.checkoutForm.value['emailUpdates'], this.checkoutForm.value['phone'], this.checkoutForm.value['textUpdates']  ).subscribe();
      this.apiService.createCheckoutSession(this.storedCart).subscribe(
        (response) => {
          window.location.href = response.url;
        },
        (error) => {
          console.error('Error creating checkout session', error);
        }
      );
    } 
    else {
      for (const field of Object.keys(this.checkoutForm.controls)) {
        const control = this.checkoutForm.get(field);
        if (control && control.invalid) {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize first letter
          window.alert(`${fieldName} is invalid.`);
          control.markAsTouched({ onlySelf: true });
          break; // Exit the loop after finding the first invalid field
        }
      }
    }
  }
}
