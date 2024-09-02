import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css',
  providers: [DatePipe]
})
export class ProjectPageComponent implements OnInit{
  constructor(private datePipe: DatePipe){}
  date: any = "";
  time: any = "";
  ngOnInit(): void {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }
  updateTime() {
    const now = new Date();
    this.time = this.datePipe.transform(now, 'hh:mm a');
    this.date = this.datePipe.transform(now, 'MM/dd/yyyy');
  }
}
