import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cs409RedirectionPageComponent } from './cs-409-redirection-page.component';

describe('Cs409RedirectionPageComponent', () => {
  let component: Cs409RedirectionPageComponent;
  let fixture: ComponentFixture<Cs409RedirectionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cs409RedirectionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cs409RedirectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
