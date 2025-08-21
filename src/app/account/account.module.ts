import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpPageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    SharedModule,
    ModalModule
  ]
})
export class AccountModule { }
