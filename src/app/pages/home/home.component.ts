import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModeServiceService } from '../../services/mode-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  constructor(private datePipe: DatePipe, private modeService: ModeServiceService) { }

  // content window stuff
  
  currentDescription: string = "";
  descriptions: string[] = [
    "Browse through a diverse range of projects created by our community of developers. From web development and mobile apps to machine learning and AI.",
    "Search through mostly sports-related APIs that are upadted weekly. Our documentation page should help you integrate with your applications.",
    "I blog about any new skills or technologies that I am learning as well as random non-technical topics.",
    "View my social media links and contact me about any questions you may have or suggestions on improving my website!"
  ]
  contentChange(i: number){
    this.currentDescription = this.descriptions[i];
    document.getElementById("option0")?.classList.remove("selected");
    document.getElementById("option1")?.classList.remove("selected");
    document.getElementById("option2")?.classList.remove("selected");
    document.getElementById("option3")?.classList.remove("selected");
    document.getElementById("option" + i)?.classList.add("selected");
  }

  // task bar stuff
  date: any = "";
  time: any = "";


  // define calculator variables
  calculatorDisplayString: string = '0';
  calculatorOutput: number = 0;
  calculatorNextOperation: string = '';
 
  // define windows
  @ViewChild('welcomeWindow', { static: true }) welcomeWindow!: ElementRef;
  @ViewChild('welcomeWindowHeader', { static: true }) welcomeWindowHeader!: ElementRef;
  
  @ViewChild('calculatorWindow', { static: true }) calculatorWindow!: ElementRef;
  @ViewChild('calculatorWindowHeader', { static: true }) calculatorWindowHeader!: ElementRef;
  
  // keep track of which index is ontop (increments each time a new window is grabbed)
  currentZIndex: number = 11; 

  // keep track of windows
  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  mode: string = "informal";
  ngOnInit(): void {
    // this.modeService.mode$.subscribe(mode => this.mode = mode);
    
    this.makeDraggable(this.welcomeWindow.nativeElement, this.welcomeWindowHeader.nativeElement);
    this.makeDraggable(this.calculatorWindow.nativeElement, this.calculatorWindowHeader.nativeElement);
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.contentChange(0);
  }
  toggleMode() {
    this.modeService.toggleMode();
    this.makeDraggable(this.welcomeWindow.nativeElement, this.welcomeWindowHeader.nativeElement);
    this.makeDraggable(this.calculatorWindow.nativeElement, this.calculatorWindowHeader.nativeElement);
  }
  updateTime() {
    const now = new Date();
    this.time = this.datePipe.transform(now, 'hh:mm a');
    this.date = this.datePipe.transform(now, 'MM/dd/yyyy');
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

  calculatorInputNumber(c: string){
    if (c == 'pi'){
      this.calculatorDisplayString = '3.142';
    }
    else if(c == 'e'){
      this.calculatorDisplayString = '2.718';
    }
    else{
      if(this.calculatorDisplayString == "0")
        this.calculatorDisplayString = c;
      else
        this.calculatorDisplayString += c;
    }
  }

  calculatorBackspace(){
    if(this.calculatorDisplayString.length > 0)
      this.calculatorDisplayString = this.calculatorDisplayString.substring(0, this.calculatorDisplayString.length -1)
    if(this.calculatorDisplayString.length <= 0)
      this.calculatorDisplayString = "0"
  }
  calculatorClearEntry(){
    this.calculatorDisplayString = "0";
  }
  
  calculatorClear(){
    this.calculatorClearEntry();
    this.calculatorOutput = 0;
  }

  calculatorOperation(op: string){
    if(op == 'sqt'){
     this.calculatorDisplayString = (Math.round(Math.sqrt(Number(this.calculatorDisplayString)) * 1000)/1000).toString();
     return;
    }
    else if(op == 'inverse'){
      this.calculatorDisplayString = (Math.round(1/Number(this.calculatorDisplayString) * 1000)/1000).toString();
      return;
    }
    else if(op == 'percent'){
      this.calculatorDisplayString = (this.calculatorOutput * Number(this.calculatorDisplayString) / 100).toString();
      return;
    }
    else if(op == 'sin'){
      this.calculatorDisplayString = (Math.round(Math.sin(Number(this.calculatorDisplayString)) * 1000) / 1000).toString(); 
      return;
    }
    else if(op == 'cos'){
      this.calculatorDisplayString = (Math.round(Math.cos(Number(this.calculatorDisplayString)) * 1000) / 1000).toString(); 
      return;
    }
    else if(op == 'tan'){
      this.calculatorDisplayString = (Math.round(Math.tan(Number(this.calculatorDisplayString)) * 1000) / 1000).toString(); 
      return;
    }
    else if(op == 'ln'){
      this.calculatorDisplayString = (Math.round(Math.log(Number(this.calculatorDisplayString))/Math.log(Math.E) * 1000) / 1000).toString(); 
      return;
    }
    else if(op == 'log'){
      this.calculatorDisplayString = (Math.round(Math.log(Number(this.calculatorDisplayString))/Math.log(10) * 1000) / 1000).toString(); 
      return;
    }
    else if(op == 'exp'){
      this.calculatorDisplayString = (Math.pow(10, Number(this.calculatorDisplayString))).toString();
      return;
    }
    else if(op == 'x^2'){
      this.calculatorDisplayString = (Math.pow(Number(this.calculatorDisplayString), 2)).toString();
      return;
    }
    else if(op == 'x^3'){
      this.calculatorDisplayString = (Math.pow(Number(this.calculatorDisplayString), 3)).toString();
      return;
    }
    else if(op == 'n!'){
      this.calculatorDisplayString = (this.factorial(Number(this.calculatorDisplayString))).toString();
      return;
    }
    
   this.calculatorNextOperation = op; 
   this.calculatorOutput = Number(this.calculatorDisplayString);   
   this.calculatorClearEntry();
  }
  calculatorSubmit(){
    if(this.calculatorNextOperation == "add"){
      this.calculatorOutput += Number(this.calculatorDisplayString)
    }
    else if(this.calculatorNextOperation == "subtract"){
      this.calculatorOutput -= Number(this.calculatorDisplayString)
    }
    else if(this.calculatorNextOperation == "divide"){
      this.calculatorOutput /= Number(this.calculatorDisplayString)
    } 
    else if(this.calculatorNextOperation == "multiply"){
      this.calculatorOutput *= Number(this.calculatorDisplayString)
    }
    else if(this.calculatorNextOperation == "x^y"){
      this.calculatorOutput = Math.round(Math.pow(this.calculatorOutput,Number(this.calculatorDisplayString)) * 1000) /1000;
    }
    this.calculatorDisplayString = this.calculatorOutput.toString();
  }
  calculatorFlipSign(){
    this.calculatorDisplayString = (Number(this.calculatorDisplayString) * -1).toString();
  }

  factorial(n: number): number {
    if (n == 0) return 1;
    return n * this.factorial(n - 1);
  }

}
