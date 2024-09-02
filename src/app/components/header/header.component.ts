import { Component, OnInit } from '@angular/core';
import { ModeServiceService } from '../../services/mode-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private modeService: ModeServiceService){}
  mode: string = "";
  ngOnInit(): void {
    this.modeService.mode$.subscribe(mode => this.mode = mode);
  }
  toggleMode() {
    this.modeService.toggleMode();
  }
}
