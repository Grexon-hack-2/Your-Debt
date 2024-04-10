import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/Utils/Auth.service';
import { PersistenceService } from 'src/Utils/Persistence.service';

export const AuthGuard: CanActivateFn = () => {
    const keyThemeColor: string = "color-Theme";
    const authService  = inject(AuthService);
    const router$ = inject(Router);
    const persistence = inject(PersistenceService);

    if(authService.isAuthenticated()){
        if(persistence.get(keyThemeColor) !== null && persistence.get(keyThemeColor) === 'dark'){
            document.body.classList.toggle('dark', true);
        }

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