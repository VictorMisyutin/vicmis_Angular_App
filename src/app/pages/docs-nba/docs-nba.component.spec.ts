import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsNBAComponent } from './docs-nba.component';

describe('DocsNBAComponent', () => {
  let component: DocsNBAComponent;
  let fixture: ComponentFixture<DocsNBAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsNBAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsNBAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
