import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupFormComponent } from './login-signup-form.component';

describe('LoginSignupFormComponent', () => {
  let component: LoginSignupFormComponent;
  let fixture: ComponentFixture<LoginSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSignupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
