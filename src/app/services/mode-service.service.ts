import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeServiceService {

  private modeSubject = new BehaviorSubject<string>('formal');
  mode$ = this.modeSubject.asObservable();

  constructor() {
    const storedMode = localStorage.getItem("mode") || 'professional';
    this.modeSubject.next(storedMode);
  }

  toggleMode(mode: string) {
    const newMode = mode;
    this.modeSubject.next(newMode);
    localStorage.setItem("mode", newMode);
  }
}
