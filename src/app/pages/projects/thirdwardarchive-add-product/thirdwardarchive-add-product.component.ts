import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thirdwardarchive-add-product',
  templateUrl: './thirdwardarchive-add-product.component.html',
  styleUrl: './thirdwardarchive-add-product.component.css'
})
export class ThirdwardarchiveAddProductComponent {
  productForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private router: Router){}

  onSubmit(){
    
  }
}
