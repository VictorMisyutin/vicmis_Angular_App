import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroUiComponent } from './retro-ui.component';

describe('RetroUiComponent', () => {
  let component: RetroUiComponent;
  let fixture: ComponentFixture<RetroUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetroUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetroUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
