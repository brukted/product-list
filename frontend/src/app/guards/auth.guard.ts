import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isAuthenticated = inject(AuthService).isAuthenticated();
    if (!isAuthenticated) {
        inject(Router).navigate(['/login']);
    }
    return isAuthenticated;
};