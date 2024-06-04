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

  onSubmit(){
    let user = this.authService.adminLogin(this.loginForm.value.username, this.loginForm.value.password);
    console.log(user);
    if (!user){
      alert('Invalid username or password')
    }
    else{
      this.router.navigateByUrl('/thirdwardarchive/admin')
    }
  }
}
