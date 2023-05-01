import { Injectable } from '@angular/core';
import { LoginSignupInfo } from '../models/LoginSignupInfo.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private httpClient: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
  }

  public signUp(loginInfo: LoginSignupInfo): Observable<any> {
    return this.httpClient.post<any>('auth/register', loginInfo);
  }
  public login(loginInfo: LoginSignupInfo): Observable<any> {
    return this.httpClient.post<any>('auth/sign-in', loginInfo).pipe(tap((res) => {
      localStorage.setItem('token', res.token);
      this.isAuthenticated$.next(true);
    }));
  }
}
