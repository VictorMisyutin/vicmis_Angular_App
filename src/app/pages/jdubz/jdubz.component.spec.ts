import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdubzComponent } from './jdubz.component';

describe('JdubzComponent', () => {
  let component: JdubzComponent;
  let fixture: ComponentFixture<JdubzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JdubzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JdubzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
