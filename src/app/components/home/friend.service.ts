// friend.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user-service';

@Injectable({
  providedIn: 'root',
})
export class FriendService {

  private friendRequests: { [username: string]: boolean | null } = {};

  constructor(private service: UserService) {}


  getFriendRequest(userName: string, rUsername: string): Observable<boolean | null> {
    // Assuming your service returns an Observable with the friend request status
    return this.service.getFriendRequest(userName, rUsername).pipe(
      map((response) => {
        console.log(`Friend request for ${rUsername} is ${response}`);
        this.friendRequests[rUsername] = response ? response.status : null;
        return response ? response.status : null;
      }),
      catchError((error) => {
        console.error('Error loading friend request', error);
        return of(null);
      })
    );
  }

  getStatus(rUsername: string): boolean | null {
    return this.friendRequests[rUsername] || null;
  }
}
