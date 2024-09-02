import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeServiceService {

  private modeSubject = new BehaviorSubject<string>('formal');
  mode$ = this.modeSubject.asObservable();

  toggleMode() {
    this.modeSubject.next(this.modeSubject.value === 'formal' ? 'informal' : 'formal');
  }
}
