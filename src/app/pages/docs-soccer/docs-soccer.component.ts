import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-docs-soccer',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './docs-soccer.component.html',
  styleUrl: './docs-soccer.component.css'
})
export class DocsSoccerComponent {

}
