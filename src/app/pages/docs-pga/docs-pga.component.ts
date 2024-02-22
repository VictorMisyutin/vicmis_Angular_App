import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-pga',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-pga.component.html',
  styleUrl: './docs-pga.component.css'
})
export class DocsPgaComponent {

}
