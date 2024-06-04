import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thirdwardarchive-merch-detail',
  templateUrl: './thirdwardarchive-merch-detail.component.html',
  styleUrls: ['./thirdwardarchive-merch-detail.component.css']
})
export class ThirdwardarchiveMerchDetailComponent implements OnInit {
  imageUrl: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchImage();
  }

  fetchImage() {
    this.http.get('https://vicmis.com/api/get-file', { responseType: 'blob' }).subscribe(
      (response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      },
      (error) => {
        console.error('Error fetching image', error);
      }
    );
  }
}
