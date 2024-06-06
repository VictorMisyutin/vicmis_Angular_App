import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TWAHeaderComponent } from './twa-header.component';

describe('TWAHeaderComponent', () => {
  let component: TWAHeaderComponent;
  let fixture: ComponentFixture<TWAHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TWAHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TWAHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
