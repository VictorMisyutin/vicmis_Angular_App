import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

  // submitForm() {
  //   firstName: string = '';
  //   lastName: string = '';
  //   email: string = '';
  //   message: string = '';
  //   // Here you can handle form submission logic
  //   console.log('Form submitted!');
  //   console.log('First Name:', this.firstName);
  //   console.log('Last Name:', this.lastName);
  //   console.log('Email:', this.email);
  //   console.log('Message:', this.message);
  // }
}
