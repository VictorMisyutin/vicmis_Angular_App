import { Component, OnInit } from '@angular/core';
import { local } from 'd3';

@Component({
  selector: 'app-thirdwardarchive-checkout',
  templateUrl: './thirdwardarchive-checkout.component.html',
  styleUrl: './thirdwardarchive-checkout.component.css'
})
export class ThirdwardarchiveCheckoutComponent implements OnInit{

  cart_ids: string[] = [];

  ngOnInit(): void {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      this.cart_ids = JSON.parse(storedCart);
    }
  }

}
