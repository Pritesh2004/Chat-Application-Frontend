import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  url: string = "";

  constructor(private userService: UserService, private router: Router, private securityService: SecurityService) { }

  ngOnInit(): void {

    // this.securityService.googleLogin().subscribe(
    //   (data: any) => {
    //     this.url = data.url
    //     console.log(data)
    //   }
    // );
    
  }

  loginUser(): void {
    console.log(this.user)
    this.userService.loginUser(this.user).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        sessionStorage.setItem('username', this.user.username);
        sessionStorage.setItem('password', this.user.password);
        this.router.navigate(['home']);
        // Add any additional handling or redirection logic here
      },
      error => {
        console.error('Error logging in:', error);
        // Handle error, display message, etc.
      }
    );
  }
}
