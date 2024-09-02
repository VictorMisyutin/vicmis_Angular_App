import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentlyProffesional: boolean = true;
  toggleMode(){
    this.currentlyProffesional = !this.currentlyProffesional;
  }
}
