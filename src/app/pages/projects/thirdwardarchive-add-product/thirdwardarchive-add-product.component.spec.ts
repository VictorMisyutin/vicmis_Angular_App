import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveAddProductComponent } from './thirdwardarchive-add-product.component';

describe('ThirdwardarchiveAddProductComponent', () => {
  let component: ThirdwardarchiveAddProductComponent;
  let fixture: ComponentFixture<ThirdwardarchiveAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveAddProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
