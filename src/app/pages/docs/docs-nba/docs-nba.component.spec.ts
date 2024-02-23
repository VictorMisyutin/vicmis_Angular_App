import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsNbaComponent } from './docs-nba.component';

describe('DocsNbaComponent', () => {
  let component: DocsNbaComponent;
  let fixture: ComponentFixture<DocsNbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsNbaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsNbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
