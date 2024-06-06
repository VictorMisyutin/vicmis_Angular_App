import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thirdwardarchive-admin-products-details',
  templateUrl: './thirdwardarchive-admin-products-details.component.html',
  styleUrl: './thirdwardarchive-admin-products-details.component.css'
})
export class ThirdwardarchiveAdminProductsDetailsComponent implements OnInit{
  productLines: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    console.log('here')
    this.http.get(`https://vicmis.com/api/get-all-products-info/`).subscribe(
      (response) => {
        this.productLines = response;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

}
