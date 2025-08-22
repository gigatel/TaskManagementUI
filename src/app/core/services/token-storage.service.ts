import { Inject, Injectable, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/cookie';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from "@ng-web-apis/common";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const LOGIN_KEY = 'login-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements OnInit {

  currentUserSubject = new BehaviorSubject({});
  currentUser = this.currentUserSubject.asObservable();
  win: any = window;
  taskManagementProjectPolicies: any;
  constructor(@Inject(WINDOW) private windowRef: Window, private router: Router) {
    this.getTaskManagementProjectPolicies()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  signOut(): void {
    window.localStorage.clear();
    window.close();
    Cookie.deleteAll();
  }


  public getUser(): any {
    const user = Cookie.get('currentUser');
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getCompany() {
    let getKeyValue: any;
    const data = Object.keys(Cookie.getAll());
    getKeyValue = data.find((key: any) => key === '3company' || key === '11company' || key === '12company' || key === '16company');

    if (getKeyValue && getKeyValue !== undefined && getKeyValue !== null) {
      const keyValue = Cookie.get(getKeyValue);
      return JSON.parse(keyValue);
    }
  }


  public checkPolicies(policyName: string, type: string = 'WEB'): boolean {
    var user = this.taskManagementProjectPolicies;
    var company = this.getCompany();
    if (user != null && user.role == "SuperAdmin") {
      return true;
    }

    if (user && user !== null && user !== undefined  && user.length > 0) {
      if (policyName && policyName !== null && user.filter((x: any) => x.policyName == policyName && x.policyType == type && x.companyId == company.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  getCurrentUser(): any {
    return JSON.parse(Cookie.get('currentUser') || '{}');
  }

  public getTaskManagementProjectPolicies(): any {
    if (this.taskManagementProjectPolicies && this.taskManagementProjectPolicies !== null && this.taskManagementProjectPolicies !== undefined && this.taskManagementProjectPolicies.length > 0) {
      return this.taskManagementProjectPolicies;
    } else {
      this.taskManagementProjectPolicies = [];
      let projectId = Cookie.get('TaskManagementId') || '-1';
      let appType = 'WEB';

      if(Number(projectId) > 0){
        $.ajax({
          url:   environment.hrmsApiUrl + 'Account/GetPolicies?projectId=' + projectId + '&appType=' + appType ,
          dataType: 'json',
          type:     'Get',
          async:    false,
          headers: {'Authorization': 'Bearer ' + this.getCookieToken()},
            success: (res:any) => {
              this.taskManagementProjectPolicies = res.data;
             },
             error: (xhr:any, status:any, errorThrown:any) => {
              this.taskManagementProjectPolicies = [];
          }
        });
        return this.taskManagementProjectPolicies;
      }

    }

  }

   public getCookieToken(): string {
    return Cookie.get('jwtToken') as string;
  }


}
