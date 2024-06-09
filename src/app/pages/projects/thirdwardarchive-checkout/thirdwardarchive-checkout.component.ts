import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thirdwardarchive-checkout',
  templateUrl: './thirdwardarchive-checkout.component.html',
  styleUrls: ['./thirdwardarchive-checkout.component.css']
})
export class ThirdwardarchiveCheckoutComponent implements OnInit {
  constructor(private http: HttpClient) {}

  cart_ids: string[] = [];
  cart_quantities: number[] = [];
  productMap = new Map<string, string[]>();

  productImageUrls: string[] = [];
  productInfo: string[][] = [];

  totalSum: number = 0;

  ngOnInit(): void {
    this.updateDisplay();
  }

  updateDisplay(){
    // reset vars

    this.cart_ids = [];
    this.cart_quantities = [];
    this.productMap = new Map<string, string[]>();

    this.productImageUrls = [];
    this.productInfo = [];

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      let data = JSON.parse(storedCart);
      // console.log(`Product ID: ${item.id}, Quantity: ${item.quantity}`);
      data.forEach((item: { id: string; quantity: number }) => {
        this.cart_ids.push(item.id);
        this.cart_quantities.push(item.quantity);
      });
    }{}
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

}
