import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { User } from '../user.model';
import { FriendRequest } from '../friendRequest.model';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {



  ngOnInit(): void {

    this.getUser();
    this.loadUsers();
    
  };

  userName: string = sessionStorage.getItem('username')!; 

  users: User[] = [];

  friends: User[] = [];

  pendingRequests: FriendRequest[] = [];

  friendRequest: FriendRequest[] = [];



  constructor(private service: UserService, private router:Router) {
  }

  addFriend(senderUsername: string) {
    const request = {
      senderUsername: senderUsername,
      receiverUsername: this.userName
      // Add other properties as needed
    };

    this.service.addFriend(request).subscribe(
      response => {
        console.log('Friendship added successfully:', response);
        location.reload();
      },
      error => {
        console.error('Error adding friendship:', error);
        // Log the full error response
        console.log(error.error.text);
        // Handle error
      }
    );
  }

  removeFriendRequest(sUsername: string): void {
    this.service.removeFriendRequest(sUsername, this.userName).subscribe(
      () => {
        console.log('Friend request removed successfully.');
        location.reload();
      },
      (error) => {
        console.error('Error removing friend request', error);
      }
    );
  }

  loadPendingRequests(username: string) {
    this.service.getPendingRequest(username).subscribe(
      (requests) => {
        this.pendingRequests = requests;
        console.log('Pending requests loaded:', this.pendingRequests);
      },
      (error) => {
        console.error('Error loading pending requests:', error);
      }
    );
  }
  

  getRequest(rUsername:string){

    this.service.getFriendRequest(this.userName,rUsername).subscribe(
      (respone)=>{
        console.log("Friend request for :",rUsername," is ",respone);
      },
      (error)=>{
        console.error('Error loading friend request',error)
      }
    )
  }
  

  loadUsers() {
    const username = this.userName; // Replace with the actual username

    this.service.getAllUsers(username).subscribe(
      (users) => {
        this.users = users;
        console.log('Users loaded:', this.users);
         // Trigger getFriendRequest for each user
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadFriends(user_id: number) {

    // Replace with the actual username
    this.service.getAllFriends(user_id).subscribe(
      (response) => {
        this.friends = response;
        console.log('Friends loaded:', this.friends);
      },
      (error) => {
        console.error('Error loading friends:', error);
      }
    );
  }

  sendFriendRequest(rUsername: string) {
    const senderUsername = this.userName;
    const receiverUsername = rUsername;

    this.service.sendFriendRequest(senderUsername, receiverUsername).subscribe(
      (response) => {
        console.log('Friend request sent successfully:', response);
        // Handle success
      },
      (error) => {
        console.error('Error sending friend request:', error);
        // Handle error
      }
    );
  }
 

  getUser() {
    this.service.getUserByUsername(this.userName).subscribe(
      response => {

        const currentUser = new User(response);
        console.log("current User", response);
        
        sessionStorage.setItem('userId', currentUser.id.toString());
        sessionStorage.setItem('username', currentUser.username);
        sessionStorage.setItem('fullName', currentUser.fullName);
        sessionStorage.setItem('email', currentUser.email);
        sessionStorage.setItem('status', currentUser.status.toString());
        sessionStorage.setItem('password', currentUser.password);

        
        this.loadPendingRequests(currentUser.username);
        console.log(currentUser.id)
        this.loadFriends(currentUser.id);
        // Add any additional handling or redirection logic here
      },
      error => {
        console.error('Error gettin data :', error);
        // Handle error, display message, etc.
      }
    );
  }

  updateStatus(): void {

    console.log(this.userName);
    this.service.updateStatus(this.userName).subscribe(
      response => {
        console.log('User status updated:', response);
        // Handle success, update UI, etc.
      },
      error => {
        console.error('Error updating user status:', error);
        // Handle error, display message, etc.
      }
    );
  }

  logOut() {
    this.updateStatus();
    this.service.logOut();
    this.router.navigate(['/login']);

  }
}
