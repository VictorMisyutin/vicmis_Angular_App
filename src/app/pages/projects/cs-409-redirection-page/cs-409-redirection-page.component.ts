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
    window.location.href = 'https://3ae2-2601-246-5482-2040-7073-db8e-a63b-80af.ngrok-free.app/';
    this.router.navigateByUrl('https://3ae2-2601-246-5482-2040-7073-db8e-a63b-80af.ngrok-free.app/');
  }
  

}
