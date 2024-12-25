import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynastyLandingPageComponent } from './dynasty-landing-page.component';

describe('DynastyLandingPageComponent', () => {
  let component: DynastyLandingPageComponent;
  let fixture: ComponentFixture<DynastyLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynastyLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynastyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
