import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsPgaComponent } from './docs-pga.component';

describe('DocsPgaComponent', () => {
  let component: DocsPgaComponent;
  let fixture: ComponentFixture<DocsPgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsPgaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsPgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
