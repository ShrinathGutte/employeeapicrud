import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulate registration with email and password stored in localStorage
  register(email: string, password: string): Observable<boolean> {
    // Hash the password (in a real-world scenario, you should use a more secure hashing algorithm)
    const hashedPassword = this.hashPassword(password);

    // Check if user already exists
    if (localStorage.getItem(email)) {
      return of(false); // User already exists
    }

    // Store the email and hashed password in localStorage
    localStorage.setItem(email, hashedPassword);
    return of(true); // Registration successful
  }

  // Simulate login by verifying email and password from localStorage
  login(email: string, password: string): Observable<boolean> {
    const storedHashedPassword = localStorage.getItem(email);
    if (storedHashedPassword && storedHashedPassword === this.hashPassword(password)) {
      return of(true); // Login successful
    }
    return of(false); // Login failed
  }

  // Simulate sending password reset email
  sendPasswordResetEmail(email: string): Observable<boolean> {
    // Generate a random token (you can use any method to generate a unique token)
    const token = this.generateToken();

    // Store the token in localStorage with the user's email
    localStorage.setItem('passwordResetToken', token);
    localStorage.setItem('passwordResetEmail', email);

    // Log the email and token to the console
    console.log('Password reset email sent to:', email);
    console.log('Reset token:', token);

    return of(true); // Email sent successfully
  }
  
  // Generate a random token (for demonstration purposes only)
  private generateToken(): string {
    return Math.random().toString(36).substr(2);
  }

  // Hash the password (in a real-world scenario, you should use a more secure hashing algorithm)
  private hashPassword(password: string): string {
    return btoa(password);
  }

}
