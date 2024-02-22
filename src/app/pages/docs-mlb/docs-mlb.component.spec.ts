import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsMlbComponent } from './docs-mlb.component';

describe('DocsMlbComponent', () => {
  let component: DocsMlbComponent;
  let fixture: ComponentFixture<DocsMlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsMlbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsMlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
