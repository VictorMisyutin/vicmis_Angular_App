import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaBackArrowComponent } from './twa-back-arrow.component';

describe('TwaBackArrowComponent', () => {
  let component: TwaBackArrowComponent;
  let fixture: ComponentFixture<TwaBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwaBackArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwaBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
