import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css',
]
})
export class UserRegistrationComponent {

  user = {
    username: '',
    fullName: '',
    email: '',
    password: ''
    };

  constructor(private userService: UserService, private router: Router) {}

  registerUser(): void {
    console.log(this.user)
    this.userService.registerUser(this.user).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.router.navigate(['login'])
        // Add any additional handling or redirection logic here
      },
      error => {
        console.error('Error registering user:', error);
        // Handle error, display message, etc.
      }
    );
  }
}
