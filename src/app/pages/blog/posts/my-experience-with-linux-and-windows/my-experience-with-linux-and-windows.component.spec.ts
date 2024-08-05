import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperienceWithLinuxAndWindowsComponent } from './my-experience-with-linux-and-windows.component';

describe('MyExperienceWithLinuxAndWindowsComponent', () => {
  let component: MyExperienceWithLinuxAndWindowsComponent;
  let fixture: ComponentFixture<MyExperienceWithLinuxAndWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyExperienceWithLinuxAndWindowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyExperienceWithLinuxAndWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
