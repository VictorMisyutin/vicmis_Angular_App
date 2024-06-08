import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thirdwardarchive-merch',
  templateUrl: './thirdwardarchive-merch.component.html',
  styleUrl: './thirdwardarchive-merch.component.css'
})
export class ThirdwardarchiveMerchComponent implements OnInit{
  productCount = 1;
  productImageUrls = new Array;
  productInfo = new Array;
  currentUrl = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProducts();
    this.currentUrl = window.location.href;
  }
  
  fetchProducts(){
    this.http.get('https://vicmis.com/api/get-product-count').subscribe(
      (response) => {
        this.productCount = parseInt(response.toString());
        this.fetchInfo();
      }
    );
  }
  

  fetchInfo() {
    let count = 0;
    while(count < this.productCount){
      this.http.get<string[]>(`https://vicmis.com/api/get-product-info/${count+1}`).subscribe( 
        (response) => {
          this.productInfo.push(new Array(response[0], response[1]))
        },
        (error) => {
          console.error('Error fetching information', error);
          return;
        }
      );
      count++;
    }
    this.fetchImages();
  }

  fetchImages() {
    let count = 0;
    while(count < this.productCount){
      this.http.get(`https://vicmis.com/api/get-product-image/${count+1}/0`, { responseType: 'blob' }).subscribe(
        (response) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.productImageUrls.push(reader.result as string);
          };
          reader.readAsDataURL(response);
        },
        (error) => {
          console.error('Error fetching images', error);
          return;
        }
      );
      count++;
    }
  }

}
