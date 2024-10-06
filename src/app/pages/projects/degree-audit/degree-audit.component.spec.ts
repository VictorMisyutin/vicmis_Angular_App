import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAuditComponent } from './degree-audit.component';

describe('DegreeAuditComponent', () => {
  let component: DegreeAuditComponent;
  let fixture: ComponentFixture<DegreeAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DegreeAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DegreeAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
