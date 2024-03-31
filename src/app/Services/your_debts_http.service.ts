import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Your_debts_httpService {
  private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ7XCJVc2VyQWRtaW5JRFwiOlwiOWE5YzM4NTMtMTA3MC00ODQ5LTkzMTMtMzM5MmQyNDRiZTE1XCIsXCJOYW1lVXNlclwiOlwiam9zZV8yMzA2XCIsXCJQYXNzd29yZFwiOlwiZTVmYWMyNzNlZjJiNWQyMTJmN2Y1YjAyMzVjM2NmNjkyNzFlZTA5MjRkY2VlOGVjZWE5NmU3ODc1MWQxM2VkN1wiLFwiRW1haWxcIjpcImpzYXJhYmlhbHVnbzIzMDZAZ21haWwuY29tXCJ9IiwibmJmIjoxNzExNTA3NzcyLCJleHAiOjE3MTQxODYxNzIsImlhdCI6MTcxMTUwNzc3Mn0.J2GmrZnmVInbZFsTSQ-xYIQoERQibCKlK2b5sy3DHag";
  public basePatch = environment.your_debts_core;

  /**
   *
   */
  constructor(private _http: HttpClient) 
  {

  }

  getWithHeaders<T>(url: string): Observable<any>{
    let path = `${this.basePatch}${url}`;
    return this._http.get<T>(path, {headers : this.jsonAuth()}).pipe(
      map(res => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    )

  }

  getByParams<T>(url: string , params?: any): Observable<any>{
    let path = `${this.basePatch}${url}`;
    const options = {params, headers: this.jsonAuth()};
    return this._http.get<T>(path,options).pipe(map((response)=> response),
    catchError(this.handleError));
    
  }

  post<T>(url:string, data: any): Observable<any>{
    let path = `${this.basePatch}${url}`;

    return this._http.post<T>(path, data, {headers : this.jsonAuth()}).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }

  delete<T>(url: string, params?: any): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const options = {
      headers: this.jsonAuth(),
      params
    }
    return this._http.delete(path$, options).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }

  put<T>(url: string, data: any, endpoint?: string): Observable<any> {
    let path$ = `${this.basePatch}${url}`;
    const headers = {
      headers: this.jsonAuth(),
    };

    return this._http.put<T>(path$, data, headers).pipe(
      map((res) => {
        return res;
      }),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      catchError(this.handleError)
    );
  }


  public handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  private jsonAuth = (): HttpHeaders =>
  new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${this.token}`);

private notAuth = () =>
  new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
}
