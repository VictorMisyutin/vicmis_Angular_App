import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveLoginComponent } from './thirdwardarchive-login.component';

describe('ThirdwardarchiveLoginComponent', () => {
  let component: ThirdwardarchiveLoginComponent;
  let fixture: ComponentFixture<ThirdwardarchiveLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
