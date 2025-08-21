import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { catchError, map, take, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RsaHelperService } from 'src/app/shared/Services/rsa-helper.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.scss']
})

export class OtpPageComponent implements OnInit {

  getOtp!: string;
  userId!: string;
  password!: string;
  display: any;
  isShown = false;
  loader = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private toastr: ToastrService, private tokenStorageService: TokenStorageService,
    private rsa: RsaHelperService) { }

  ngOnInit(): void {
    this.timer(1);
    // this.isShown = false;
    // this.isShown = true;

    const dataFromRoute = window.history.state;
    if (Object.keys(dataFromRoute) && Object.keys(dataFromRoute).length > 0) {
      this.userId = dataFromRoute.data.userId;
      this.password = dataFromRoute.data.password;
    }

  }
  onOtpChange(val: string) {
    this.getOtp = val;
    const data = this.getOtp.split('');

    const encryptedData = {
      userId: this.userId,
    }

    if (data && data.length > 5 && this.userId && this.password) {
      this.authenticationService.getPwdEncriptionKeyForUser(encryptedData).pipe(map(res => {
        if (res && res.success === true) {
          this.loader = true;
      
          this.rsa.publicKey = '';
          this.rsa.publicKey = res.key;

          const payload = {
            userId: this.userId ? this.userId : '',
            password: this.rsa.encryptWithPublicKey(this.password),
            otp: this.rsa.encryptWithPublicKey(this.getOtp)
          }

          this.authenticationService.login(payload).pipe(map(res => {
            if (res && res.status === 200) {
              this.tokenStorageService.saveUser(res.loginUserInfo);
              // Cookie.set('currentUser',JSON.stringify(res.loginUserInfo));
              this.tokenStorageService.saveLoginToken(res.token);
              this.tokenStorageService.saveLoginTokenByCookie(res.token);
              this.toastr.success(res.message);
              this.router.navigate(['/select-company']);
            } else {
              this.toastr.warning(res.message);
            }
          }
          )).subscribe()
        }
      })).subscribe()
    }
  }

  timer(minute: any) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.isShown = true;
        clearInterval(timer);
      }
    }, 1000);
  }

  resend() {
    const payload = {
      userId: this.userId ? this.userId : '',
    }

    this.authenticationService.getPwdEncriptionKeyForUser(payload).pipe(map(res => {
      if (res && res.success === true) {
        this.loader = true;
        this.rsa.publicKey = res.key;

        const otpPayload = {
          userId: this.userId ? this.userId : '',
          password: this.rsa.encryptWithPublicKey(this.password)
        }

        this.authenticationService.getOtp(otpPayload).pipe(take(1), map(res => {
          this.timer(1)
          this.isShown = false;

          if (res.status === 200) {
            this.toastr.success("Save Successfully !!");
          }
        }), catchError(error => {
          return throwError(error);
        })).subscribe();
      }
    })).subscribe()
  }

  hideModal() {
    const data = document.getElementById("myModal");
    if (data != null) {
      data.style.display = 'none';
      data.style.background = '';
    }
  }
}


