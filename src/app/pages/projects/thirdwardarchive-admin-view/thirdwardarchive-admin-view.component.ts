import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-thirdwardarchive-admin-view',
  templateUrl: './thirdwardarchive-admin-view.component.html',
  styleUrl: './thirdwardarchive-admin-view.component.css'
})
export class ThirdwardarchiveAdminViewComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(localStorage);
    this.authService.getProtectedData().subscribe(response => {
      console.log(response);
    });
  }
  
  logout(){
    this.authService.logout().subscribe();
  }

}
