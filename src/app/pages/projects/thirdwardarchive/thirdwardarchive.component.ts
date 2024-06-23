import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-thirdwardarchive',
  templateUrl: './thirdwardarchive.component.html',
  styleUrl: './thirdwardarchive.component.css'
})
export class ThirdwardarchiveComponent implements OnInit, OnDestroy{
  // for countdown
  private subscription: Subscription = new Subscription;
  public targetDate: Date = new Date('2024-06-24T23:59:59');
  // public targetDate: Date = new Date('2024-06-22T23:59:59');
  public countdown: string = '___ ___ ___ ___';

  // for products
  productCount = 1;
  productImageUrls = new Array;
  productInfo = new Array;
  currentUrl = "";

  email: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.updateCountdown();
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });

    this.fetchProducts();
    this.currentUrl = window.location.href;

    // check if admin
    if(this.authService.isAuthenticated())
      document.getElementById('catalog-area')?.classList.remove('hidden');
      document.getElementById('catalog-area')?.classList.add('catalog-area');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.countdown = "0d 0h 0m 0s";
      document.getElementById('catalog-area')?.classList.remove('hidden');
      document.getElementById('catalog-area')?.classList.add('catalog-area');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

  emailSignup(){
    if(this.email){
      this.apiService.updateEmailAndTextList("NA", "NA", this.email, true, "NA", false).subscribe();
      window.alert("success");
      this.email = '';
    }
  }
}
