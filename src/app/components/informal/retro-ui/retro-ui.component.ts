import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ModeServiceService } from '../../../services/mode-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-retro-ui',
  templateUrl: './retro-ui.component.html',
  styleUrl: './retro-ui.component.css'
})
export class RetroUiComponent implements OnInit, AfterViewInit {
  @ViewChild('welcomeWindow', { static: false }) welcomeWindow!: ElementRef;
  @ViewChild('welcomeWindowHeader', { static: false }) welcomeWindowHeader!: ElementRef;
  @ViewChild('welcomeWindowTask', { static: false }) welcomeWindowTask!: ElementRef;

  @ViewChild('calculatorWindow', { static: false }) calculatorWindow!: ElementRef;
  @ViewChild('calculatorWindowHeader', { static: false }) calculatorWindowHeader!: ElementRef;
  @ViewChild('calculatorWindowTask', { static: false }) calculatorWindowTask!: ElementRef;

  @ViewChild('projectsWindowTask', { static: false }) projectsWindowTask!: ElementRef;

  @ViewChild('liftwareWindow', { static: false }) liftwareWindow!: ElementRef;
  @ViewChild('liftwareWindowHeader', { static: false }) liftwareWindowHeader!: ElementRef;
  
  @ViewChild('thirdwardarchiveWindow', { static: false }) thirdwardarchiveWindow!: ElementRef;
  @ViewChild('thirdwardarchiveWindowHeader', { static: false }) thirdwardarchiveWindowHeader!: ElementRef;
  
  @ViewChild('typingGameWindow', { static: false }) typingGameWindow!: ElementRef;
  @ViewChild('typingGameWindowHeader', { static: false }) typingGameWindowHeader!: ElementRef;
  
  @ViewChild('sudokuWindow', { static: false }) sudokuWindow!: ElementRef;
  @ViewChild('sudokuWindowHeader', { static: false }) sudokuWindowHeader!: ElementRef;
  
  @ViewChild('collisionResolutionWindow', { static: false }) collisionResolutionWindow!: ElementRef;
  @ViewChild('collisionResolutionWindowHeader', { static: false }) collisionResolutionWindowHeader!: ElementRef;
  
  @ViewChild('spaceInvadersWindow', { static: false }) spaceInvadersWindow!: ElementRef;
  @ViewChild('spaceInvadersWindowHeader', { static: false }) spaceInvadersWindowHeader!: ElementRef;
  
  @ViewChild('connectionsWindow', { static: false }) connectionsWindow!: ElementRef;
  @ViewChild('connectionsWindowHeader', { static: false }) connectionsWindowHeader!: ElementRef;
  
  @ViewChild('catalogedWindow', { static: false }) catalogedWindow!: ElementRef;
  @ViewChild('catalogedWindowHeader', { static: false }) catalogedWindowHeader!: ElementRef;
  
  @ViewChild('dataVisualizationWindow', { static: false }) dataVisualizationWindow!: ElementRef;
  @ViewChild('dataVisualizationWindowHeader', { static: false }) dataVisualizationWindowHeader!: ElementRef;
  
  @ViewChild('musicRankingWindow', { static: false }) musicRankingWindow!: ElementRef;
  @ViewChild('musicRankingWindowHeader', { static: false }) musicRankingWindowHeader!: ElementRef;
  constructor(
    private modeService: ModeServiceService,
    private datePipe: DatePipe,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  mode: string = "";
  currentDescription: string = "";
  descriptions: string[] = [
    "Browse through a diverse range of projects created by our community of developers. From web development and mobile apps to machine learning and AI.",
    "Search through mostly sports-related APIs that are updated weekly. Our documentation page should help you integrate with your applications.",
    "I blog about any new skills or technologies that I am learning as well as random non-technical topics.",
    "View my social media links and contact me about any questions you may have or suggestions on improving my website!"
  ];

  date: any = "";
  time: any = "";

  calculatorDisplayString: string = '0';
  calculatorOutput: number = 0;
  calculatorNextOperation: string = '';

  currentZIndex: number = 11;
  private pos1 = 0;
  private pos2 = 0;
  private pos3 = 0;
  private pos4 = 0;

  currentRoute: string = '';
  showWelcomeWindow: boolean = true;
  showCalculatorWindow: boolean = true;

  ngOnInit(): void {
    this.modeService.mode$.subscribe((mode: string) => {
      this.mode = mode;
      if (this.mode === 'informal') {
        setTimeout(() => {
          this.setupDraggableWindows();
        });
      }
    });
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);

    this.contentChange(0);
    // document.getElementById('project-windows')?.classList.add('hide');
    this.openDefaultWindows();
    this.closeWindow(2);
  }

  ngAfterViewInit(): void {
    // Call setupDraggableWindows here if the mode is informal
    this.setupDraggableWindows();
  }

  setupDraggableWindows(): void {
    this.makeDraggable(this.welcomeWindow.nativeElement, this.welcomeWindowHeader.nativeElement);
    this.makeDraggable(this.calculatorWindow.nativeElement, this.calculatorWindowHeader.nativeElement);
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

  toggleMode(): void {
    this.modeService.toggleMode();
    setTimeout(() => this.setupDraggableWindows(), 0); // Ensure the DOM is updated
  }

  updateTime(): void {
    const now = new Date();
    this.time = this.datePipe.transform(now, 'hh:mm a');
    this.date = this.datePipe.transform(now, 'MM/dd/yyyy');
  }

  makeDraggable(element: HTMLElement, header: HTMLElement): void {
    header.onmousedown = (e: MouseEvent) => this.dragMouseDown(e, element);
  }

  dragMouseDown(e: MouseEvent, element: HTMLElement): void {
    e.preventDefault();
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    document.onmouseup = () => this.closeDragElement();
    document.onmousemove = (event: MouseEvent) => this.elementDrag(event, element);
  }

  elementDrag(e: MouseEvent, element: HTMLElement): void {
    e.preventDefault();
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    let newTop = element.offsetTop - this.pos2;
    let newLeft = element.offsetLeft - this.pos1;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight + 45;

    newLeft = Math.max(0, Math.min(newLeft, windowWidth - elementWidth));
    newTop = Math.max(0, Math.min(newTop, windowHeight - elementHeight));

    element.style.top = `${newTop}px`;
    element.style.left = `${newLeft}px`;
    
    element.style.zIndex = this.currentZIndex.toString();
    this.currentZIndex++;
  }

  closeDragElement(): void {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  openDefaultWindows(): void {
    this.openWindow(0);
    this.openWindow(1);
  }

  openWindow(n: number): void {
    if (n === 0) {
      this.welcomeWindow.nativeElement.setAttribute('style', 'display:block');
      this.welcomeWindowTask.nativeElement.setAttribute('style', 'display:flex');
    } else if (n === 1) {
      this.calculatorWindow.nativeElement.setAttribute('style', 'display:block');
      this.calculatorWindowTask.nativeElement.setAttribute('style', 'display:flex');
    }
    else if (n === 2){
      document.getElementById('project-windows')?.classList.remove('hide')
      this.projectsWindowTask.nativeElement.setAttribute('style', 'display:flex')
    }
    this.currentZIndex++;
  }

  closeAllWindows(): void {
    this.closeWindow(0);
    this.closeWindow(1);
    this.closeWindow(2);
  }

  closeWindow(n: number): void {
    if (n === 0) {
      this.welcomeWindow.nativeElement.setAttribute('style', 'display:none');
      this.welcomeWindowTask.nativeElement.setAttribute('style', 'display:none');

    } else if (n === 1) {
      this.calculatorWindow.nativeElement.setAttribute('style', 'display:none');
      this.calculatorWindowTask.nativeElement.setAttribute('style', 'display:none');

    }
    else if (n === 2){
      document.getElementById('project-windows')?.classList.add('hide')
      this.projectsWindowTask.nativeElement.setAttribute('style', 'display:none')
    }
  }

  contentChange(i: number): void {
    this.currentDescription = this.descriptions[i];
    for (let j = 0; j < this.descriptions.length; j++) {
      document.getElementById("option" + j)?.classList.remove("selected");
    }
    document.getElementById("option" + i)?.classList.add("selected");
  }

  calculatorInputNumber(c: string): void {
    if (c === 'pi') {
      this.calculatorDisplayString = '3.142';
    } else if (c === 'e') {
      this.calculatorDisplayString = '2.718';
    } else {
      this.calculatorDisplayString = this.calculatorDisplayString === "0" ? c : this.calculatorDisplayString + c;
    }
  }

  calculatorBackspace(): void {
    this.calculatorDisplayString = this.calculatorDisplayString.length > 0
      ? this.calculatorDisplayString.slice(0, -1)
      : "0";
  }

  calculatorClearEntry(): void {
    this.calculatorDisplayString = "0";
  }

  calculatorClear(): void {
    this.calculatorClearEntry();
    this.calculatorOutput = 0;
  }

  calculatorOperation(op: string): void {
    const displayNumber = Number(this.calculatorDisplayString);

    switch (op) {
      case 'sqt':
        this.calculatorDisplayString = (Math.round(Math.sqrt(displayNumber) * 1000) / 1000).toString();
        break;
      case 'inverse':
        this.calculatorDisplayString = (Math.round(1 / displayNumber * 1000) / 1000).toString();
        break;
      case 'percent':
        this.calculatorDisplayString = (this.calculatorOutput * displayNumber / 100).toString();
        break;
      case 'sin':
        this.calculatorDisplayString = (Math.round(Math.sin(displayNumber) * 1000) / 1000).toString();
        break;
      case 'cos':
        this.calculatorDisplayString = (Math.round(Math.cos(displayNumber) * 1000) / 1000).toString();
        break;
      case 'tan':
        this.calculatorDisplayString = (Math.round(Math.tan(displayNumber) * 1000) / 1000).toString();
        break;
      case 'ln':
        this.calculatorDisplayString = (Math.round(Math.log(displayNumber) / Math.log(Math.E) * 1000) / 1000).toString();
        break;
      case 'log':
        this.calculatorDisplayString = (Math.round(Math.log(displayNumber) / Math.log(10) * 1000) / 1000).toString();
        break;
      case 'exp':
        this.calculatorDisplayString = (Math.pow(10, displayNumber)).toString();
        break;
      case 'x^2':
        this.calculatorDisplayString = (Math.pow(displayNumber, 2)).toString();
        break;
      case 'x^3':
        this.calculatorDisplayString = (Math.pow(displayNumber, 3)).toString();
        break;
      case 'n!':
        this.calculatorDisplayString = (this.factorial(displayNumber)).toString();
        break;
      default:
        this.calculatorNextOperation = op;
        this.calculatorOutput = displayNumber;
        this.calculatorClearEntry();
        break;
    }
  }

  calculatorSubmit(): void {
    const displayNumber = Number(this.calculatorDisplayString);

    switch (this.calculatorNextOperation) {
      case 'add':
        this.calculatorOutput += displayNumber;
        break;
      case 'subtract':
        this.calculatorOutput -= displayNumber;
        break;
      case 'divide':
        this.calculatorOutput /= displayNumber;
        break;
      case 'multiply':
        this.calculatorOutput *= displayNumber;
        break;
      case 'x^y':
        this.calculatorOutput = Math.round(Math.pow(this.calculatorOutput, displayNumber) * 1000) / 1000;
        break;
    }
    
    this.calculatorDisplayString = this.calculatorOutput.toString();
  }

  calculatorFlipSign(): void {
    this.calculatorDisplayString = (Number(this.calculatorDisplayString) * -1).toString();
  }

  factorial(n: number): number {
    if (n === 0) return 1;
    return n * this.factorial(n - 1);
  }

}
