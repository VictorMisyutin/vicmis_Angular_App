import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
    this.makeDraggable(this.liftwareWindow.nativeElement, this.liftwareWindowHeader.nativeElement);
    this.makeDraggable(this.thirdwardarchiveWindow.nativeElement, this.thirdwardarchiveWindowHeader.nativeElement);
    this.makeDraggable(this.typingGameWindow.nativeElement, this.typingGameWindowHeader.nativeElement);
    this.makeDraggable(this.sudokuWindow.nativeElement, this.sudokuWindowHeader.nativeElement);
    this.makeDraggable(this.collisionResolutionWindow.nativeElement, this.collisionResolutionWindowHeader.nativeElement);
    this.makeDraggable(this.connectionsWindow.nativeElement, this.connectionsWindowHeader.nativeElement);
    this.makeDraggable(this.spaceInvadersWindow.nativeElement, this.spaceInvadersWindowHeader.nativeElement);
    this.makeDraggable(this.catalogedWindow.nativeElement, this.catalogedWindowHeader.nativeElement);
    this.makeDraggable(this.dataVisualizationWindow.nativeElement, this.dataVisualizationWindowHeader.nativeElement);
    this.makeDraggable(this.musicRankingWindow.nativeElement, this.musicRankingWindowHeader.nativeElement);
  }
  updateTime() {
    const now = new Date();
    this.time = this.datePipe.transform(now, 'hh:mm a');
    this.date = this.datePipe.transform(now, 'MM/dd/yyyy');
  }


   // define windows
   @ViewChild('liftwareWindow', { static: true }) liftwareWindow!: ElementRef;
   @ViewChild('liftwareWindowHeader', { static: true }) liftwareWindowHeader!: ElementRef;
   
   @ViewChild('thirdwardarchiveWindow', { static: true }) thirdwardarchiveWindow!: ElementRef;
   @ViewChild('thirdwardarchiveWindowHeader', { static: true }) thirdwardarchiveWindowHeader!: ElementRef;
   
   @ViewChild('typingGameWindow', { static: true }) typingGameWindow!: ElementRef;
   @ViewChild('typingGameWindowHeader', { static: true }) typingGameWindowHeader!: ElementRef;
   
   @ViewChild('sudokuWindow', { static: true }) sudokuWindow!: ElementRef;
   @ViewChild('sudokuWindowHeader', { static: true }) sudokuWindowHeader!: ElementRef;
   
   @ViewChild('collisionResolutionWindow', { static: true }) collisionResolutionWindow!: ElementRef;
   @ViewChild('collisionResolutionWindowHeader', { static: true }) collisionResolutionWindowHeader!: ElementRef;
   
   @ViewChild('spaceInvadersWindow', { static: true }) spaceInvadersWindow!: ElementRef;
   @ViewChild('spaceInvadersWindowHeader', { static: true }) spaceInvadersWindowHeader!: ElementRef;
   
   @ViewChild('connectionsWindow', { static: true }) connectionsWindow!: ElementRef;
   @ViewChild('connectionsWindowHeader', { static: true }) connectionsWindowHeader!: ElementRef;
   
   @ViewChild('catalogedWindow', { static: true }) catalogedWindow!: ElementRef;
   @ViewChild('catalogedWindowHeader', { static: true }) catalogedWindowHeader!: ElementRef;
   
   @ViewChild('dataVisualizationWindow', { static: true }) dataVisualizationWindow!: ElementRef;
   @ViewChild('dataVisualizationWindowHeader', { static: true }) dataVisualizationWindowHeader!: ElementRef;
   
   @ViewChild('musicRankingWindow', { static: true }) musicRankingWindow!: ElementRef;
   @ViewChild('musicRankingWindowHeader', { static: true }) musicRankingWindowHeader!: ElementRef;
   
   // keep track of which index is ontop (increments each time a new window is grabbed)
   currentZIndex: number = 11; 
 
   // keep track of windows
   private pos1 = 0;
   private pos2 = 0;
   private pos3 = 0;
   private pos4 = 0;
 
   makeDraggable(element: HTMLElement, header: HTMLElement): void {
     header.onmousedown = (e: MouseEvent) => this.dragMouseDown(e, element);
   }
 
   dragMouseDown(e: MouseEvent, element: HTMLElement): void {
     e.preventDefault();
     // Get the mouse cursor position at startup:
     this.pos3 = e.clientX;
     this.pos4 = e.clientY;
 
     document.onmouseup = () => this.closeDragElement();
     document.onmousemove = (event: MouseEvent) => this.elementDrag(event, element);
   }
 
   elementDrag(e: MouseEvent, element: HTMLElement): void {
     e.preventDefault();
     // Calculate the new cursor position:
     this.pos1 = this.pos3 - e.clientX;
     this.pos2 = this.pos4 - e.clientY;
     this.pos3 = e.clientX;
     this.pos4 = e.clientY;
 
     // Calculate new positions
     let newTop = element.offsetTop - this.pos2;
     let newLeft = element.offsetLeft - this.pos1;
 
     // Boundary checks
     const windowWidth = window.innerWidth;
     const windowHeight = window.innerHeight;
     const elementWidth = element.offsetWidth;
     const elementHeight = element.offsetHeight + 45;
 
     // Prevent window from leaving the screen horizontally
     if (newLeft < 0) {
       newLeft = 0;
     } else if (newLeft + elementWidth > windowWidth) {
       newLeft = windowWidth - elementWidth;
     }
 
     // Prevent window from leaving the screen vertically
     if (newTop < 0) {
       newTop = 0;
     } else if (newTop + elementHeight > windowHeight) {
       newTop = windowHeight - elementHeight;
     }
 
     // Set the element's new position:
     element.style.top = newTop + "px";
     element.style.left = newLeft + "px";
     
     // move to top of z-index
     element.style.zIndex = this.currentZIndex.toString();
     this.currentZIndex++;
   }
 
   closeDragElement(): void {
     // Stop moving when mouse button is released:
     document.onmouseup = null;
     document.onmousemove = null;
   }


}
