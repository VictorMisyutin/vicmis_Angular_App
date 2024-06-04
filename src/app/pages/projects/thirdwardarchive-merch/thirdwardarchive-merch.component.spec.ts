import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveMerchComponent } from './thirdwardarchive-merch.component';

describe('ThirdwardarchiveMerchComponent', () => {
  let component: ThirdwardarchiveMerchComponent;
  let fixture: ComponentFixture<ThirdwardarchiveMerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveMerchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
