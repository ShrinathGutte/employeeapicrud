import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  resetEmailSent: boolean = false;

  constructor(private authService: AuthService) {}

  sendPasswordResetEmail() {
    this.authService.sendPasswordResetEmail(this.email).subscribe(
      () => {
        this.resetEmailSent = true;
      },
      (error) => {
        console.error('Failed to send reset password email:', error);
        // Handle error (e.g., display error message)
      }
    );
  }

}
