import { Status } from "./status.enum";

export interface User_Details{

  id: number;
   username: string;
   fullName: string;
   email: string;
   status: Status;
   password: string;
}
 
 export class User {
   id: number;
   username: string;
   fullName: string;
   email: string;
   status: Status;
   password: string;
 
   constructor(data:
    User_Details
   ) {
     this.id = data.id;
     this.username = data.username;
     this.fullName = data.fullName;
     this.email = data.email;
     this.status = data.status;
     this.password = data.password;
   }
 }
 