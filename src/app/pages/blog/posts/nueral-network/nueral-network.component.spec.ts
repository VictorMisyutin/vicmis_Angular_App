import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NueralNetworkComponent } from './nueral-network.component';

describe('NueralNetworkComponent', () => {
  let component: NueralNetworkComponent;
  let fixture: ComponentFixture<NueralNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NueralNetworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NueralNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
