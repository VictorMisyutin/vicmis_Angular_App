import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-cbb',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-cbb.component.html',
  styleUrl: './docs-cbb.component.css'
})
export class DocsCbbComponent {

}
