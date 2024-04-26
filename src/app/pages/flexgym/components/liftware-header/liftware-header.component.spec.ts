import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftwareHeaderComponent } from './liftware-header.component';

describe('LiftwareHeaderComponent', () => {
  let component: LiftwareHeaderComponent;
  let fixture: ComponentFixture<LiftwareHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiftwareHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiftwareHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
