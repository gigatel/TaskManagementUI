import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorageService.getToken();
        if (currentUser && currentUser != null && currentUser != undefined && currentUser != 'null') {
          this.router.navigate(['/admin/master-admin']);
            // logged in so return true
            return false;
        }else{
            return true;
        }
  }

  }
