import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { TweetService } from '../tweet.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private service: TweetService, private router: Router) { }

    canActivate() {
        if (this.service.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}