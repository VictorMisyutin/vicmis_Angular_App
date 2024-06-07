import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-thirdwardarchive-login',
  templateUrl: './thirdwardarchive-login.component.html',
  styleUrl: './thirdwardarchive-login.component.css'
})
export class ThirdwardarchiveLoginComponent {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router){}
  admin_username: any;

  onSubmit(){
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
      if (response.message === 'Logged in successfully') {
        this.router.navigateByUrl('/thirdwardarchive/admin')

        // success = true;
      } 
      else {
        alert('Invalid username or password')
      }
    });
  }
}
