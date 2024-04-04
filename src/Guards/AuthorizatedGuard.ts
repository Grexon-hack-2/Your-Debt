import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/Utils/Auth.service';

export const AuthGuard: CanActivateFn = () => {

    const authService  = inject(AuthService);
    const router$ = inject(Router);

    if(authService.isAuthenticated()){
        return true;
    }
    else {
        router$.navigate(['']);
        return false;
    }
}

export const LoginGuard: CanActivateFn = () => {
    const authService  = inject(AuthService);
    const router$ = inject(Router);

    if(!authService.isAuthenticated()){
        return true;
    }
    else {
        router$.navigate(['/inicio']);
        return false;
    }
}