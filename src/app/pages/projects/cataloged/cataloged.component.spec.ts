import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogedComponent } from './cataloged.component';

describe('CatalogedComponent', () => {
  let component: CatalogedComponent;
  let fixture: ComponentFixture<CatalogedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
