import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.tokenStorageService.getLoginToken();

        if (currentUser && currentUser != null && currentUser != undefined && currentUser != 'null') {
            const getLastActivityTime:any = this.tokenStorageService.getLastActivityTime();
     
            if(getLastActivityTime && getLastActivityTime !== null && getLastActivityTime !== undefined){
              var newDate:any=new Date();
              var diff = Math.abs(newDate - getLastActivityTime);
              var minutes=0;
              if(diff>0){
                minutes = Math.floor((diff/1000)/60);
              }
              if(minutes>15) {
                this.tokenStorageService.signOut();
                this.router.navigate(['/login']);
                return false;
              }
            }
            // logged in so return true
            return true;
        } else {

            this.router.navigate(['/login']);
            return false;
        }
    }
}
