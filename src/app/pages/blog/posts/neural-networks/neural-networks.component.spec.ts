import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetworksComponent } from './neural-networks.component';

describe('NeuralNetworksComponent', () => {
  let component: NeuralNetworksComponent;
  let fixture: ComponentFixture<NeuralNetworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeuralNetworksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeuralNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
