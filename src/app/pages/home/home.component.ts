import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  calculator_output_string: string = '0';
  calculator_output: number = 0;
  @ViewChild('welcomeWindow', { static: true }) welcomeWindow!: ElementRef;
  @ViewChild('welcomeWindowHeader', { static: true }) welcomeWindowHeader!: ElementRef;

  @ViewChild('calculatorWindow', { static: true }) calculatorWindow!: ElementRef;
  @ViewChild('calculatorWindowHeader', { static: true }) calculatorWindowHeader!: ElementRef;

  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  ngOnInit(): void {
    this.makeDraggable(this.welcomeWindow.nativeElement, this.welcomeWindowHeader.nativeElement);
    this.makeDraggable(this.calculatorWindow.nativeElement, this.calculatorWindowHeader.nativeElement);
  }

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
