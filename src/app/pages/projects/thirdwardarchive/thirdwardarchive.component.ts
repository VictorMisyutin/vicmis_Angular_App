import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-thirdwardarchive',
  templateUrl: './thirdwardarchive.component.html',
  styleUrl: './thirdwardarchive.component.css'
})
export class ThirdwardarchiveComponent implements OnInit, OnDestroy{
  
  private subscription: Subscription = new Subscription;
  public targetDate: Date = new Date('2024-06-24T23:59:59');
  public countdown: string = '___ ___ ___ ___';

  constructor() {}

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      // this.countdown = 'Countdown has ended';
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
