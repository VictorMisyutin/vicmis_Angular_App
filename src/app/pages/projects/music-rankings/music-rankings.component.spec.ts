import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicRankingsComponent } from './music-rankings.component';

describe('MusicRankingsComponent', () => {
  let component: MusicRankingsComponent;
  let fixture: ComponentFixture<MusicRankingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicRankingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MusicRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
