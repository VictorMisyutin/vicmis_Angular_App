import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModeServiceService } from '../../services/mode-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private modeService: ModeServiceService) { }

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.canvas = document.querySelector('.noise') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.loop();
  }

  @HostListener('window:resize')
  resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  generateStatic(): void {
    const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const value = Math.random() * 255;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = value; // Grayscale
      pixels[i + 3] = 255; // Full opacity
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  loop(): void {
    this.generateStatic();
    requestAnimationFrame(() => this.loop());
  }

  mode: string = "";
  ngOnInit(): void {
    this.modeService.mode$.subscribe((mode: string) => {
      this.mode = mode;
    });

  }

  onCameraClick(cameraNumber: number): void {
    console.log(`Camera ${cameraNumber} clicked`);
    // Add any other functionality you want to handle here
  }

}
