import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupInfo } from 'src/app/models/LoginSignupInfo.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isLoading = false;

  onSubmit(loginInfo: LoginSignupInfo) {
    this.isLoading = true;
    this.authService.signUp(loginInfo)
      .subscribe({
        error: () => { this.isLoading = false },
        complete: () => { this.isLoading = false; this.router.navigate(['/login']); }
      });
  }
}
