import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeServiceService {

  private modeSubject = new BehaviorSubject<string>('formal');
  mode$ = this.modeSubject.asObservable();

  constructor() {
    const storedMode = localStorage.getItem("mode") || 'formal';
    this.modeSubject.next(storedMode);
  }

  toggleMode() {
    const newMode = this.modeSubject.value === 'formal' ? 'informal' : 'formal';
    this.modeSubject.next(newMode);
    localStorage.setItem("mode", newMode);
  }
}
