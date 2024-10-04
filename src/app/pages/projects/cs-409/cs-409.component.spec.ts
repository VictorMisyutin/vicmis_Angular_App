import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CS409Component } from './cs-409.component';

describe('CS409Component', () => {
  let component: CS409Component;
  let fixture: ComponentFixture<CS409Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CS409Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CS409Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
