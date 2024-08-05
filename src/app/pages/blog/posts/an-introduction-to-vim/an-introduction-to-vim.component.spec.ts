import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnIntroductionToVimComponent } from './an-introduction-to-vim.component';

describe('AnIntroductionToVimComponent', () => {
  let component: AnIntroductionToVimComponent;
  let fixture: ComponentFixture<AnIntroductionToVimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnIntroductionToVimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnIntroductionToVimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
