import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginSignupInfo } from 'src/app/models/LoginSignupInfo.model';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.css']
})
export class LoginSignupFormComponent {
  @Input() isLogin: boolean = false;
  @Input() isLoading: boolean = false;
  @Output() submitted = new EventEmitter<LoginSignupInfo>();

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  });

  onSubmit() {
    this.submitted.emit(this.form.value as LoginSignupInfo);
  }
}
