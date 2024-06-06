import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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

  product_id: string | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.product_id = params['id'];
    });
    this.fetchImage();
    this.fetchInfo();
  }

  fetchImage() {
    this.http.get(`https://vicmis.com/api/get-product-image/${this.product_id}/0`, { responseType: 'blob' }).subscribe(
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
    this.http.get(`https://vicmis.com/api/get-product-image/${this.product_id}/1`, { responseType: 'blob' }).subscribe(
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
  
  fetchInfo() {
    this.http.get<string[]>(`https://vicmis.com/api/get-product-info/${this.product_id}`).subscribe(
      (response) => {
        if (response.length >= 4) {
          this.title = response[0];
          this.price = response[1];
          this.description = response[2];
          this.materials = response[3];
        } else {
          console.error('Unexpected response format', response);
        }
      },
      (error) => {
        console.error('Error fetching information', error);
      }
    );
  }
}
