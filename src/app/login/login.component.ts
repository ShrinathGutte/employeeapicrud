import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const storedHashedPassword = localStorage.getItem(email);
      const inputPassword = CryptoJS.SHA256(this.loginForm.value.password).toString(CryptoJS.enc.Hex);
      if (storedHashedPassword && storedHashedPassword === inputPassword) {
        // Authentication successful, create session and redirect
        localStorage.setItem('loggedInUser', email);
        // Redirect to dashboard or desired page
        this.router.navigate(['/employeelist']);
      } else {
        // Authentication failed, display error message
      }
    }
  }

  goToRegistration()
  {
    alert("Register your account");
    this.router.navigate(['/register']);
  }

  goToForgotPassword()
  {
    alert("Reset Password");
    this.router.navigate(['/forgotpassword']);
  }

}
