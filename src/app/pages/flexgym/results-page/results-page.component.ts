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

  age: string = "18";
  weight: string = "180";
  duration: string = "45";
  equipment: string = "nothing";
  goal: string = "lose weight";
  frequency: string = "4";
  showWorkout: boolean = false;
  constructor(private apiService: ApiService, private elementRef: ElementRef, private renderer: Renderer2) {}


  getWorkout() {
    const ageInput = document.getElementById("age") as HTMLInputElement;
    const weightInput = document.getElementById("weight") as HTMLInputElement;
    const durationInput = document.getElementById("durations") as HTMLInputElement;
    const goalInput = document.getElementById("goal") as HTMLInputElement;
    const frequencyInput = document.getElementById("frequency") as HTMLInputElement;
    const equipmentTextarea = document.getElementById("equipment") as HTMLTextAreaElement;

    this.age = ageInput.value;
    this.weight = weightInput.value;
    this.duration = durationInput.value;
    this.goal = goalInput.value;
    this.frequency = frequencyInput.value;
    this.equipment = equipmentTextarea.value;

    this.apiService.getWorkout(this.age, this.weight, this.goal, this.duration, this.equipment, this.frequency).subscribe(data => {
      this.workout = data.workout;
    });
    this.showWorkout = true;
  }
}
