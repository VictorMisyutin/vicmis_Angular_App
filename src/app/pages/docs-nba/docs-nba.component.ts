import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-nba',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-nba.component.html',
  styleUrl: './docs-nba.component.css'
})
export class DocsNBAComponent {

}
