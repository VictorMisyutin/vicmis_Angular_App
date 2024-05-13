import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.css'
})
export class ResultsPageComponent{
  workout: string = "Loading...";
  // workout: string = "ajdlk ajsdlkjaldaldkja lkdjad\nlakjd adoa sdjkash daihd aidiaudh aidhasidn ajdn ajkfh quifhawdnawidu aiuwdbahdb aid hwidb aibawiud badihabfia bdiadh ajvnasjc njaskd nakjfha kjd hajkfha jdjdkvhas d ";

  age: string = "18";
  weight: string = "180";
  duration: string = "45";
  equipment: string = "nothing";
  goal: string = "lose weight";
  frequency: string = "4";
  showWorkout: boolean = false;
  constructor(private apiService: ApiService, private elementRef: ElementRef, private renderer: Renderer2, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      // get categories
      if (params['a'] !== undefined && params['a'] !== '') {
        this.age = params['a'];
      }
      if (params['b'] !== undefined && params['b'] !== '') {
        this.weight = params['b'];
      }
      if (params['c'] !== undefined && params['c'] !== '') {
        this.frequency = params['c'];
      }
      if (params['d'] !== undefined && params['d'] !== '') {
        this.duration = params['d'];
      }
      if (params['e'] !== undefined && params['e'] !== '') {
        this.goal = params['e'];
      }
      if (params['f'] !== undefined && params['f'] !== '') {
        this.equipment = params['f'];
      }
    });
    this.apiService.getWorkout(this.age, this.weight, this.goal, this.duration, this.equipment, this.frequency).subscribe(data => {
      this.workout = data.workout;
    });
  }
}
