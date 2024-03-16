import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Token } from '../components/token';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  token: string = "";

  constructor(private http: HttpClient) { }

  googleLogin(): Observable<any> {
    return this.http.get("http://localhost:8181/auth/url");
  }

  getPrivate(url: string): any {
    return this.http.get("http://localhost:8181" + url, {headers: new HttpHeaders({"Authorization": "Bearer " + this.token})});
  }

  getToken(code: string): Observable<boolean> {
    return this.http.get<Token>("http://localhost:8181/auth/callback?code=" + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Token>) => {
        if (response.status === 200 && response.body !== null) {
          this.token = response.body.token;
          return true;
        } else {
          return false;
        }
      }));
  }}
