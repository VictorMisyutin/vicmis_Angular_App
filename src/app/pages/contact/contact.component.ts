import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  contactForm!: FormGroup;
  postSubmissionText: string = "";
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;
      // TODO: do something with the values
      // probably send myself an email or 
      // place the information in a JSON file or
      // anywhere where I can view the message and information

      // ascthetic changes
      document.getElementById('post-submission-text')?.classList.remove('sub-text-invalid');
      document.getElementById('post-submission-text')?.classList.add('sub-text-valid');
      this.postSubmissionText = "Thank you for your submission!";
      this.contactForm.reset();
      // Proceed with form submission logic
    } else {
      document.getElementById('post-submission-text')?.classList.add('sub-text-invalid');
      this.postSubmissionText = "Something went wrong, please double check the form.";
    }
  }

}
