import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveCheckoutComponent } from './thirdwardarchive-checkout.component';

describe('ThirdwardarchiveCheckoutComponent', () => {
  let component: ThirdwardarchiveCheckoutComponent;
  let fixture: ComponentFixture<ThirdwardarchiveCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
