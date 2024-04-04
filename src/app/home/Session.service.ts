import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthorizationResponse, RegisterData } from 'src/Models/sessionModel';
import { PersistenceService } from 'src/Utils/Persistence.service';
import { Your_debts_httpService } from '../Services/your_debts_http.service';
import { AuthService } from 'src/Utils/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

constructor(
  private _persistence$: PersistenceService,
  private _http: Your_debts_httpService,
  private _auth: AuthService
) { }

  setAuth(value: AuthorizationResponse): void{
    this._auth.setAuth(value);
  }

  logout(): void{
    this._persistence$.deleteAll();
  }

  sessionLogin(data: any): Observable<AuthorizationResponse> {
    const url = "api/Login/Auth";
    return this._http.post<AuthorizationResponse>(url, data).pipe(tap(async (UserInfo: AuthorizationResponse) => {
      this.setAuth(UserInfo);
    }))
  }

  registerUser(data: RegisterData): Observable<string> {
    const url = "api/Register";
    return this._http.post<string>(url, data);
  }

}


