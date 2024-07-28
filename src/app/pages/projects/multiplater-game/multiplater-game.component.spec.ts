import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplaterGameComponent } from './multiplater-game.component';

describe('MultiplaterGameComponent', () => {
  let component: MultiplaterGameComponent;
  let fixture: ComponentFixture<MultiplaterGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiplaterGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplaterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
