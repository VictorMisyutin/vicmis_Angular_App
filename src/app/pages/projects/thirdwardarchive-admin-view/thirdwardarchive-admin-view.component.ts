import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-thirdwardarchive-admin-view',
  templateUrl: './thirdwardarchive-admin-view.component.html',
  styleUrl: './thirdwardarchive-admin-view.component.css'
})
export class ThirdwardarchiveAdminViewComponent{

  constructor(private authService: AuthService) {}

  
  logout(){
    this.authService.logout();
  }

}
