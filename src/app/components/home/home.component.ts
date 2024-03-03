import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit{

  ngOnInit(): void {
 
    console.log(this.user);
    this.getUser();

  };

  userName:string = sessionStorage.getItem('username')!; //The ! at the end of the expression tells TypeScript to treat the result as definitely not null.

  user:any;

  constructor(private service: UserService){}
  



  getUser(){
    this.service.getUserByUsername(this.userName).subscribe(
      response => {
        
        console.log(response);
        this.user = response;
        console.log(this.user);
        // Add any additional handling or redirection logic here
      },
      error => {
        console.error('Error gettin data :', error);
        // Handle error, display message, etc.
      }
    );
  }

  updateStatus(): void {
    console.log(this.user);
    console.log(this.userName);

    this.service.updateStatus(this.userName, this.user).subscribe(
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

  logOut(){
    this.updateStatus();
    this.service.logOut();
    location.reload();

  }
}
