import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsSoccerComponent } from './docs-soccer.component';

describe('DocsSoccerComponent', () => {
  let component: DocsSoccerComponent;
  let fixture: ComponentFixture<DocsSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsSoccerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
