import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8181'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${username}`);
  }

  updateStatus(username:string , user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/offline/${username}`, user);
  }


  isLoggedIn() {
    let local = sessionStorage.getItem('username');
    if (local == undefined || local == '' || local == null) {
      return false;

    }
    else {
      return true;
    }
  }

  logOut(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    return true;
  }
}
