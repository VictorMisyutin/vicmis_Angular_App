import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

interface Rectangle {
  height: number;
  color: string;
}

@Component({
  selector: 'app-viz-sort',
  templateUrl: './viz-sort.component.html',
  styleUrl: './viz-sort.component.css'
})

export class VizSortComponent{

  rectangles: Rectangle[] = [];
  size:number = 10;
  
  // for timer
  timer: number = 0;
  startTime: number = 0;
  updateInterval: number = 1;

  constructor() {
    this.generateRandomHeights();
  }

  updateSize() {
    let newSize: number = 0;
    const enterSizeElement = document.getElementById("sizeInput") as HTMLInputElement;
    if (enterSizeElement && enterSizeElement.value !== '') {
      newSize = parseInt(enterSizeElement.value);
      if (newSize >= 10 && newSize <= 30) {
        this.size = newSize;
      }
    }
    enterSizeElement.value = '';
    this.generateRandomHeights();
    clearTimeout(this.timer);
  }

  generateRandomHeights() {
    this.rectangles = [];
    for (let i = 0; i < this.size; i++) {
      let height = Math.floor(Math.random() * 100) + 30; // Generates heights between 30 and 129
      this.rectangles.push({ height: height, color: 'blue' });
    }
  }

  bubbleSort() {
    this.startTime = Date.now();
    this.sort();
  }

  sort() {
    let i = 0;
    let delay = 0;
    let count = 0;
    const swapAndContinue = () => {
      let swapped = false;
      for (let j = 0; j < this.size - 1 - i; j++) {
        this.timer = (Date.now() - this.startTime) / 1000;
        delay += this.updateInterval * 1000;
        setTimeout(() => {
          
          if (this.rectangles[j].height > this.rectangles[j + 1].height) {
              const temp = this.rectangles[j];
              this.rectangles[j] = this.rectangles[j + 1];
              // this.rectangles[j].color = 'yellow';
              this.rectangles[j + 1] = temp;
              swapped = true;
          }
          }, delay);
      }
      count++;
      if (!swapped) {
          return;
      }
        i++;
        swapAndContinue();
    };
    swapAndContinue();
  }
}
