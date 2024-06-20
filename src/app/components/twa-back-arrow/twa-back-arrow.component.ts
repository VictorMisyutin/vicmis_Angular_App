import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-twa-back-arrow',
  templateUrl: './twa-back-arrow.component.html',
  styleUrl: './twa-back-arrow.component.css'
})
export class TwaBackArrowComponent {

  constructor(private location: Location) {}

  goBack(){
    this.location.back()
  }
}
