import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdwardarchiveAdminViewComponent } from './thirdwardarchive-admin-view.component';

describe('ThirdwardarchiveAdminViewComponent', () => {
  let component: ThirdwardarchiveAdminViewComponent;
  let fixture: ComponentFixture<ThirdwardarchiveAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdwardarchiveAdminViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThirdwardarchiveAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
