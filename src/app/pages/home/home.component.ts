import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  @ViewChild('welcomeWindow', { static: true }) welcomeWindow!: ElementRef;
  @ViewChild('welcomeWindowHeader', { static: true }) welcomeWindowHeader!: ElementRef;

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  ngOnInit(): void {
    this.makeDraggable();
  }

  makeDraggable(): void {
    const element = this.welcomeWindow.nativeElement;
    const header = this.welcomeWindowHeader.nativeElement;

    header.onmousedown = (e: MouseEvent) => this.dragMouseDown(e);
  }

  dragMouseDown(e: MouseEvent): void {
    e.preventDefault();
    // Get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    document.onmouseup = () => this.closeDragElement();
    document.onmousemove = (event: MouseEvent) => this.elementDrag(event);
  }

  elementDrag(e: MouseEvent): void {
    e.preventDefault();
    // Calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    const element = this.welcomeWindow.nativeElement;

    // Calculate new positions
    let newTop = element.offsetTop - this.pos2;
    let newLeft = element.offsetLeft - this.pos1;

    // Boundary checks
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Prevent window from leaving the screen horizontally
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft + elementWidth > windowWidth) {
      newLeft = windowWidth - elementWidth;
    }

    // Prevent window from leaving the screen vertically
    if (newTop < 80) {
      newTop = 80;
    } else if (newTop + elementHeight > windowHeight) {
      newTop = windowHeight - elementHeight;
    }

    // Set the element's new position:
    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";
  }

  closeDragElement(): void {
    // Stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
