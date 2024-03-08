export class FriendRequest {
    
    id: number;
    senderUsername:string;
    receiverUsername:string;
    status:boolean;
    
  
    constructor(
      id: number,
      senderUsername: string,
      receiverUsername: string,
      status:boolean
      
    ) {
      this.id = id;
      this.senderUsername = senderUsername;
      this.receiverUsername = receiverUsername;
      this.status = status;
    }
  }