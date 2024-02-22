import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCbbComponent } from './docs-cbb.component';

describe('DocsCbbComponent', () => {
  let component: DocsCbbComponent;
  let fixture: ComponentFixture<DocsCbbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsCbbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsCbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
