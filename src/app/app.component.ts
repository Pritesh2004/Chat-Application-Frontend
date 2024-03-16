import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat-Application';


  // content: string = "";

  // constructor(private service: SecurityService, private route: ActivatedRoute,private router: Router) {}

  
  // ngOnInit(): void {
  //   this.route.queryParams
  //     .subscribe(params => {
  //       if (params["code"] !== undefined) {
  //         this.service.getToken(params["code"]).subscribe(result => {
  //           if (result === true) {

  //             this.service.getPrivate("/messages").subscribe(
  //               (data: Message) =>{ this.content = data.message
  //               sessionStorage.setItem('googleEmail',this.content)
  //             }
  //               );
  //             console.log("home route")
  //             this.router.navigate(['/home',params["code"]])
  //           } else {
  //             console.log("login route")
  //             this.router.navigate(['/'])
  //           }
  //         });
  //       }
  //     }
  //   );
  // }
}
