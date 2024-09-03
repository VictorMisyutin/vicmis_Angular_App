import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModeServiceService } from '../../services/mode-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor( private modeService: ModeServiceService) {}

  mode: string = "";


  ngOnInit(): void {
    this.modeService.mode$.subscribe((mode: string) => {
      this.mode = mode;
    });
  }

  toggleMode(): void {
    this.modeService.toggleMode();
  }

}
