import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModeServiceService } from '../../services/mode-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  constructor(private modeService: ModeServiceService) { }

  // content window stuff
  
  mode: string = "";
  ngOnInit(): void {
    this.modeService.mode$.subscribe((mode: string) => {
      this.mode = mode;
    });
    
  }
  

}
