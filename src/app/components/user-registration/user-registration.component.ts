import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css',
]
})
export class UserRegistrationComponent implements OnInit{

  user = {
    username: '',
    fullName: '',
    email: '',
    password: ''
    };
    formOtp = {
      fOtp:'',
    };
    otp: string = '';
    message: string = '';
    otpSent:boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.otp = this.generateOTP();
    console.log(this.otp, " otp when loaded")

  }

  generateOTP(): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  
  sendOTP(email:string) {
    this.userService.sendOTP(email, this.otp)
      .subscribe(
        response => {

          this.message = response;
          console.log(this.message)
          console.log(this.otp," otp when sent")
          alert("Otp Sent to your email")
          this.otpSent=true;
        },
        error => {
          console.log(email," ",this.otp)
          console.error('Error verifying OTP:', error);
          this.message = 'Failed to verify OTP. Please try again later.';
        }
      );
  }

  verifyOtp(formOtp:string){
    console.log(formOtp," otp in form")
    console.log(this.otp, " otp from email")
    if(formOtp === this.otp){
      console.log(this.user)
      this.registerUser();
    }
    else{
      alert("Wrong OTP")
    }
  }

  registerUser(): void {
    this.userService.registerUser(this.user).subscribe(
      response => {
        console.log('User registered successfully:', response);
        alert("Registration Successfull")
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
