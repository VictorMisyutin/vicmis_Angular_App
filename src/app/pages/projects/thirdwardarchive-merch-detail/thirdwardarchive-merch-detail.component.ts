import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { local } from 'd3';

@Component({
  selector: 'app-thirdwardarchive-merch-detail',
  templateUrl: './thirdwardarchive-merch-detail.component.html',
  styleUrls: ['./thirdwardarchive-merch-detail.component.css']
})
export class ThirdwardarchiveMerchDetailComponent implements OnInit {
  imageUrl: string | undefined;
  imageUrls: string[] = []; 
  title: string | undefined;
  price: string | undefined;
  description: string | undefined;
  materials: string | undefined;
  numberOfImages: number = 1;
  product_id: string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product_id = params['id'];
    });
    this.fetchInfo();
  }
  
  fetchInfo() {
    this.http.get<string[]>(`https://vicmis.com/api/get-product-info/${this.product_id}`).subscribe(
      (response) => {
        this.title = response[0].trim();
        this.price = response[1].trim();
        this.description = response[2].trim();
        this.materials = response[3].trim();
        this.numberOfImages = Number(response[6].trim())
        this.fetchImages();
      },
      (error) => {
        console.error('Error fetching information', error);
      }
    );
  }

  fetchImages() {
    for(let i = 0; i < this.numberOfImages; i++){
      this.http.get(`https://vicmis.com/api/get-product-image/${this.product_id}/${i}`, { responseType: 'blob' }).subscribe(
        (response) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imageUrl = reader.result as string;
            this.imageUrls.push(this.imageUrl)
            };
            reader.readAsDataURL(response);
            },
            (error) => {
          console.error('Error fetching image', error);
        }
      );
    }
  }
  

  addToCart() {
    let currentCart = localStorage.getItem('cart');
    let cartArray = currentCart ? JSON.parse(currentCart) : [];
  
    let productInCart = cartArray.find((item: { id: string; quantity: number }) => item.id === this.product_id);
  
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cartArray.push({ id: this.product_id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));

    window.alert("product added");
  }
  

}
