import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConnectionsComponent } from './create-connections.component';

describe('CreateConnectionsComponent', () => {
  let component: CreateConnectionsComponent;
  let fixture: ComponentFixture<CreateConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateConnectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
