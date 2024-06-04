import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveComponent } from './thirdwardarchive.component';

describe('ThirdwardarchiveComponent', () => {
  let component: ThirdwardarchiveComponent;
  let fixture: ComponentFixture<ThirdwardarchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
