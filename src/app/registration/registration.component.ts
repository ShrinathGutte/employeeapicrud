import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value.email;
      const hashedPassword = CryptoJS.SHA256(this.registrationForm.value.password).toString(CryptoJS.enc.Hex);
      localStorage.setItem(email, hashedPassword);
      // Redirect to login page or display success message
      alert("Registration Successful");
      this.router.navigate(['/login']);
    }
  }

  // goToLogin()
  // {
  //   alert("navigate");
  //   this.router.navigate(['/employeelist']);
  // }
}
