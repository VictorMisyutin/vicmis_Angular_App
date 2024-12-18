import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cs-409-redirection-page',
  templateUrl: './cs-409-redirection-page.component.html',
  styleUrls: ['./cs-409-redirection-page.component.css']
})
export class Cs409RedirectionPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("here")
    window.location.href = 'https://a864-66-253-130-240.ngrok-free.app/';
    this.router.navigateByUrl('https://a864-66-253-130-240.ngrok-free.app/');

  }
  

}
