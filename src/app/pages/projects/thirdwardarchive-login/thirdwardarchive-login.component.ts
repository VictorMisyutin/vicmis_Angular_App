import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';

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
    let user = this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
    if (!user){
      alert('Invalid username or password')
    }
    else{
      this.router.navigateByUrl('/thirdwardarchive/admin')
    }
  }
}
