import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupInfo } from 'src/app/models/LoginSignupInfo.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }
  isLoading = false;

  onSubmit(loginInfo: LoginSignupInfo) {
    this.isLoading = true;
    this.authService.login(loginInfo)
      .subscribe({
        error: (err) => { this.isLoading = false; throw err; },
        complete: () => { this.isLoading = false; this.router.navigate(['/']); }
      });
  }
}
