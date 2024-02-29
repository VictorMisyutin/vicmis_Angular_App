import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollisionResolutionComponent } from './collision-resolution.component';

describe('CollisionResolutionComponent', () => {
  let component: CollisionResolutionComponent;
  let fixture: ComponentFixture<CollisionResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollisionResolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollisionResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
