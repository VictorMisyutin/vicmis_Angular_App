import { Component } from '@angular/core';
import { ModeServiceService } from '../../services/mode-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  navItems = [
    { label: 'Mode', section: 'mode' },
    { label: 'Theme', section: 'theme ' }
  ];

  constructor(private modeService: ModeServiceService, private router: Router) {}

  activeSection = 'mode';

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleMode(): void {
    const selectedMode = (document.querySelector('input[name="theme"]:checked') as HTMLInputElement)?.value;
    if (selectedMode) {
      this.modeService.toggleMode(selectedMode);
    }
    this.router.navigateByUrl('')
  }
  

}
