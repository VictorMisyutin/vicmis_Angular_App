import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveMerchDetailComponent } from './thirdwardarchive-merch-detail.component';

describe('ThirdwardarchiveMerchDetailComponent', () => {
  let component: ThirdwardarchiveMerchDetailComponent;
  let fixture: ComponentFixture<ThirdwardarchiveMerchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveMerchDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveMerchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
