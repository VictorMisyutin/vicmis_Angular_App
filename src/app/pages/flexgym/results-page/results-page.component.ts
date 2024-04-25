import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css'
})
export class ResultsPageComponent{
  workout: string = "Loading...";
  // workout: string = "adjkabdkjada\nabjabdjasbdjkasbd\najadjaksdha jksd dhaskjd adh jaakj dh";

  age: string = "18";
  weight: string = "180";
  duration: string = "45";
  equipment: string = "nothing";
  showWorkout: boolean = false;
  constructor(private apiService: ApiService, private elementRef: ElementRef, private renderer: Renderer2) {}


  getWorkout() {
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const weightInput = document.getElementById("weight") as HTMLInputElement;
    const durationInput = document.getElementById("durations") as HTMLInputElement;
    const equipmentTextarea = document.getElementById("Equipment") as HTMLTextAreaElement;

    this.age = ageInput.value;
    this.weight = weightInput.value;
    this.duration = durationInput.value;
    this.equipment = equipmentTextarea.value;

    this.apiService.getWorkout(this.age, this.weight, this.duration, this.equipment).subscribe(data => {
      this.workout = data.workout;
    });
    this.showWorkout = true;
  }
}
