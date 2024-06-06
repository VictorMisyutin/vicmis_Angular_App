import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveAdminProductsDetailsComponent } from './thirdwardarchive-admin-products-details.component';

describe('ThirdwardarchiveAdminProductsDetailsComponent', () => {
  let component: ThirdwardarchiveAdminProductsDetailsComponent;
  let fixture: ComponentFixture<ThirdwardarchiveAdminProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveAdminProductsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveAdminProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
