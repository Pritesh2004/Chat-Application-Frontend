import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../components/user.model';
import { FriendRequest } from '../components/friendRequest.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8181'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/`, user);
  }

  sendOTP(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.baseUrl}/verify-otp`, body, { responseType: 'text', headers, observe: 'response' })
      .pipe(map(response => response.body)); // Assuming the response body contains the OTP verification status
  }

  addFriend(request: any): Observable<any> {
    const url = `${this.baseUrl}/user/addFriend`;
    return this.http.post(url, request);
  }

  removeFriendRequest(sUsername: string, rUsername: string): Observable<void> {
    const url = `${this.baseUrl}/friend/deleteRequest/${sUsername}/${rUsername}`;

    return this.http.delete<void>(url);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, user);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${username}`);
  }

  updateStatus(username: string): Observable<any> {
    const updateStatusDto = { username: username };

    return this.http.post(`${this.baseUrl}/user/logout`, updateStatusDto)
    .pipe(
      catchError(error => {
        console.error('Error updating user status:', error);
        throw error;
      })
    );  }
  
  getAllUsers(username: string): Observable<User[]> {

    return this.http.get<User[]>(`${this.baseUrl}/user/all/${username}`);

  }

  getAllFriends(user_id: any): Observable<User[]> {

    return this.http.get<User[]>(`${this.baseUrl}/user/getFriends/${user_id}`);

  }

  getPendingRequest(username: string): Observable<FriendRequest[]> {

    return this.http.get<FriendRequest[]>(`${this.baseUrl}/friend/pending-requests/${username}`);

  }

  getFriendRequest(sUsername: string, rUsername: string): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/friend/friendRequest/${sUsername}/${rUsername}`);

  }

  sendFriendRequest(senderUsername: string, receiverUsername: string): Observable<any> {
    const request = {
      senderUsername: senderUsername,
      receiverUsername: receiverUsername,
    };


    return this.http.post<any>(`${this.baseUrl}/friend/send-request`, request);
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
