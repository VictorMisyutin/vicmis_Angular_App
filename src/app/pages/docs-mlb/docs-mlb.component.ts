import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-mlb',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-mlb.component.html',
  styleUrl: './docs-mlb.component.css'
})
export class DocsMlbComponent {

}
