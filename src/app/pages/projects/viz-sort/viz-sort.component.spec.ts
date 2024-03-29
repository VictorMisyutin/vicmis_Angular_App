import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizSortComponent } from './viz-sort.component';

describe('VizSortComponent', () => {
  let component: VizSortComponent;
  let fixture: ComponentFixture<VizSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VizSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VizSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
