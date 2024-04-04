import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthorizationResponse, Ijwt, UserData } from 'src/Models/sessionModel';
import { PersistenceService } from './Persistence.service';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthorizationResponse> {
  private KEYSESSION: string = 'auth';
  private jwt: string = '';
  constructor(private _persistense$: PersistenceService) 
  { 
    super({} as AuthorizationResponse);

    const isAuth = _persistense$.get(this.KEYSESSION);
    if(isAuth){
      this.setAuth(isAuth);
    }

    this.getToken.subscribe((resp: string) => {
      this.jwt = resp;
    })
  }

  isAuthenticated(): boolean {
    const token = this.jwt;

    if(token){
      try {
        // Decodificar el token
        const tokenPayload: any = jwtDecode(token);

        // Obtener la fecha de expiración del token en segundos
        const expirationDateInSeconds = tokenPayload.exp;

        // Obtener la fecha actual en segundos
        const currentDateInSeconds = Math.floor(Date.now() / 1000);

        if(expirationDateInSeconds < currentDateInSeconds){
          this._persistense$.delete(this.KEYSESSION);
          return false;
        }
        else {
          return true;
        }

      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }
    else {
      return false;
    }
  }


  readonly setAuth = this.updater((state, payload: AuthorizationResponse) => {
    this._persistense$.save(this.KEYSESSION, payload);
    return {
      ...state,
      token: payload.token
    }
  })

  readonly getToken: Observable<string> = this.select((state: AuthorizationResponse) => state.token);
  readonly getDataUser: Observable<UserData> = this.select((state: AuthorizationResponse) => {
    const tokenPayload : Ijwt = jwtDecode(state.token);
    const { nameid } = tokenPayload;
    return JSON.parse(nameid);
  })

}
