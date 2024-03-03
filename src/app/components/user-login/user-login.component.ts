import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  user = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  loginUser(): void {
    console.log(this.user)
    this.userService.loginUser(this.user).subscribe(
      response => {
        console.log('User logged in successfully:', response);
        sessionStorage.setItem('username',this.user.username);
        sessionStorage.setItem('password',this.user.password);
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
