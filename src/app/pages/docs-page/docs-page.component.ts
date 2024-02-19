import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-page.component.html',
  styleUrl: './docs-page.component.css',
})
export class DocsPageComponent {

}
