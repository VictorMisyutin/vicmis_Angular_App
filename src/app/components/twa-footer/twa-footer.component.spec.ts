import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwaFooterComponent } from './twa-footer.component';

describe('TwaFooterComponent', () => {
  let component: TwaFooterComponent;
  let fixture: ComponentFixture<TwaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwaFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
