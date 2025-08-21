import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, take, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { RsaHelperService } from 'src/app/shared/Services/rsa-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Login Component
export class LoginComponent {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  loader = false;
  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: UntypedFormBuilder, private authenticationService: AuthenticationService, private router: Router,
   private toastr: ToastrService, private tokenStorage: TokenStorageService, private rsa: RsaHelperService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {

    //   if(this.f['email'].value === 'admin' && this.f['password'].value === 'admin'){
    //      const data = {
    //       email: this.f['email'].value,
    //       password: this.f['password'].value
    //      }
    //     localStorage.setItem('toast', 'true');
    //     localStorage.setItem('currentUser', JSON.stringify(data));
    //     this.router.navigate(['/super-admin/employee-master']);
    //     this.toastr.success('Login Successfully');
    //   }else if(this.f['email'].value === 'user' && this.f['password'].value === 'user'){
    //     const data = {
    //      email: this.f['email'].value,
    //      password: this.f['password'].value
    //     }
    //    localStorage.setItem('toast', 'true');
    //    localStorage.setItem('currentUser', JSON.stringify(data));
    //
    //    this.toastr.success('Login Successfully');
    //  }else{

    //  this.toastr.warning('please check the details');
    //  }
    // this.submitted = true;

    // Login Api
    if (!this.loginForm.valid) {
      this.toastr.warning('Please check the credentials!!')
      return
    }

    Cookie.set('user', JSON.stringify(this.f['user'].value ? this.f['user'].value : ''));
    localStorage.setItem('userId',JSON.stringify(this.f['user'].value ? this.f['user'].value : '') )

    const payload = {
      userId: this.f['user']?.value || '',
      // password: this.f['password'].value
    }

    this.authenticationService.getPwdEncriptionKeyForUser(payload).pipe(map(res => {
      if(res && res.success === true){
      // this.loader = true;
       this.rsa.publicKey = res.key;

      const otpPayload = {
        userId: this.f['user'].value,
        password: this.rsa.encryptWithPublicKey(this.f['password'].value)
      }

      this.authenticationService.getOtp(otpPayload).pipe(take(1),map(res => {
      // this.loader = true;
        if(res && res.status === 200){
          // this.tokenStorage.saveLoginToken(res.token)
          this.router.navigate(['/otp'], { state: { data: {   userId: this.f['user'].value,
          password: this.f['password'].value} } });
        }else{
          // this.loader = false;
          this.toastr.warning('Please check the credentials!!');
        }
      })).subscribe();
      }else{
        this.toastr.warning('Please check the credentials!!');
      }
    })).subscribe()

    // const payload = {
    //   userId: this.f['user'].value,
    //   password: this.f['password'].value
    // }

    //   this.authenticationService.getOtp(payload).pipe(take(1),map(res => {
    //   // this.loader = true;
    //     if(res.status === 200){
    //       // this.tokenStorage.saveLoginToken(res.token)
    //       this.router.navigate(['/otp'], { state: { data: payload } });
    //     }else{
    //       this.toastr.warning(res.message);
    //     }
    //   }), catchError(error => {
    //     return throwError(error);
    //   })).subscribe();


    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
