import { Inject, Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/cookie';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from "@ng-web-apis/common";
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';
const LOGIN_KEY = 'login-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  currentUserSubject = new BehaviorSubject({});
  currentUser = this.currentUserSubject.asObservable();
  win: any = window;
  constructor(@Inject(WINDOW) private windowRef: Window, private router: Router) {}

  signOut(): void {
    window.localStorage.clear();
    // Cookie.delete('jwtToken');
    // Cookie.delete('jwtToken', '/');
    // Cookie.delete('3company', '/');
    // Cookie.delete('11company', '/');
    // Cookie.delete('12company', '/');
    // Cookie.delete('company', '/');
    // Cookie.delete('currentUser', '/');
    Cookie.deleteAll();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.getSessionCompany() + TOKEN_KEY);
    window.localStorage.setItem(this.getSessionCompany() + TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(this.getSessionCompany() + TOKEN_KEY);
  }


  public saveUser(user: any): void {
    const currentUser = JSON.stringify({ userFullName: user.userFullName, role: user.role, companyId: user.companyId, companyName: user.companyName, id: user.id, designaionName: user.designaionName, employeeId: user.employeeId, employeeCode: user.employeeCode });
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));

    Cookie.set('currentUser', JSON.stringify({ userFullName: user.userFullName, role: user.role, companyId: user.companyId, companyName: user.companyName, id: user.id, designaionName: user.designaionName, employeeId: user.employeeId, employeeCode: user.employeeCode }));

    if (user.policies && user.policies.length > 0) {
      let vmsPolicy: any;
      let VendorRegPolicy: any;
      let fiberSupportPolicy: any[] = [];
      let fleetManagementPolicy: any[] = [];
      let DssPolicy: any[] = [];
      let InfraPolicy: any[] = [];

      if (user.policies.filter((x: any) => x.projectName == "Vendor").length > 0) {
        VendorRegPolicy = user.policies.filter((x: any) => x.projectName == "Vendor");
        if (VendorRegPolicy && VendorRegPolicy !== null && VendorRegPolicy.length > 0) {
          Cookie.set('VendorRegProjectId', VendorRegPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "VMS").length > 0) {
        vmsPolicy = user.policies.filter((x: any) => x.projectName == "VMS");
        if (vmsPolicy && vmsPolicy !== null && vmsPolicy.length > 0) {
          Cookie.set('VMSProjectId', vmsPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "Route Map").length > 0) {
        vmsPolicy = user.policies.filter((x: any) => x.projectName == "Route Map");
        if (vmsPolicy && vmsPolicy !== null && vmsPolicy.length > 0) {
          Cookie.set('RMProjectId', vmsPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "Fiber Support").length > 0) {
        fiberSupportPolicy = user.policies.filter((x: any) => x.projectName == "Fiber Support");
        if (fiberSupportPolicy && fiberSupportPolicy !== null && fiberSupportPolicy.length > 0) {
          Cookie.set('FiberSupportId', fiberSupportPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "Fleet Management").length > 0) {
        fleetManagementPolicy = user.policies.filter((x: any) => x.projectName == "Fleet Management");
        if (fleetManagementPolicy && fleetManagementPolicy !== null && fleetManagementPolicy.length > 0) {
          Cookie.set('FleetManagementId', fleetManagementPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "DSS").length > 0) {
        DssPolicy = user.policies.filter((x: any) => x.projectName == "DSS");
        if (DssPolicy && DssPolicy !== null && DssPolicy.length > 0) {
          Cookie.set('DssId', DssPolicy[0].projectId);
        }
      }

      if (user.policies.filter((x: any) => x.projectName == "Infra").length > 0) {
        InfraPolicy = user.policies.filter((x: any) => x.projectName == "Infra");
        if (InfraPolicy && InfraPolicy !== null && InfraPolicy.length > 0) {
          Cookie.set('InfraId', InfraPolicy[0].projectId);
        }
      }
    }
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveLoginToken(token: string): void {
    window.localStorage.setItem(LOGIN_KEY, token);
  }

  public getLoginToken(): string | null {
    return window.localStorage.getItem(LOGIN_KEY);
  }

  public saveCompany(obj: {}): void {
    return window.localStorage.setItem(this.getSessionCompany() + 'company', JSON.stringify(obj));
  }

  getCompany(): any {
    const data = window.localStorage.getItem(this.getSessionCompany() + 'company');
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  public saveLoginTokenByCookie(token: string): void {
    Cookie.set('jwtToken', token);
  }

  public saveCompanyCookie(obj: {}): void {
    Cookie.set(this.getSessionCompany() + 'company', JSON.stringify(obj));
  }

  public checkPolicies(policyName: string, type: string = 'WEB'): boolean {
    var user = this.getUser();
    var company = this.getCompany();
    if (user != null && user.role == "SuperAdmin") {
      return true;
    }
    
    if (user && user !== null && user !== undefined && user.policies && user.policies !== null && user.policies.length > 0) {
      if (policyName && policyName !== null && user.policies.filter((x: any) => x.policyName == policyName && x.policyType == type && x.companyId == company.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  public checkType(type: string): boolean {
    var user = this.getUser();
    var company = this.getCompany();
    if (user && user !== null && user !== undefined && user.policies.length > 0) {
      if (type && type !== null && user.policies.filter((x: any) => x.policyType == type && x.companyId == company.id).length > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  saveLoginTokenFromWindow(token: string) {
    this.windowRef.sessionStorage.setItem('Token', token);
  }

  setSessionTabId() {
    var tabId = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("TabId", tabId)
  }

  getSessionTabId(): string {
    var val: any = sessionStorage.getItem("TabId");
    return val == null ? "" : val;
  }
  setSessionCompany(val: any) {
    sessionStorage.setItem("selectedCompanyId", val)
  }

  getSessionCompany(): string {
    var val: any = sessionStorage.getItem("selectedCompanyId");
    return val == null ? "" : val;
  }
  clearLastTabCompany() {
    localStorage.setItem("setLastTabCompany", "")
  }
  setLastTabCompany() {
    localStorage.setItem("setLastTabCompany", this.getSessionCompany())
  }

  getLastTabCompany(): string {
    var val: any = localStorage.getItem("setLastTabCompany")
    return val == null ? "" : val;
  }
  setTabs(id: any) {
    var tabs: any = this.getTabs();
    if (!tabs.includes(id)) {
      if (tabs == "") {
        tabs = id;
      } else {
        tabs = tabs + "," + id;
      }
    }
    localStorage.setItem("tabs", tabs);
  }

  removeTabs(id: any) {
    var tabs: any = this.getTabs();
    if (tabs.includes(id)) {
      let separatedArray = tabs.split(',');
      let index = separatedArray.indexOf(id);
      separatedArray.splice(index, 1);
      tabs = separatedArray.join(",");
      localStorage.setItem("tabs", tabs);
    }
  }

  getTabs() {
    var tabs: any = localStorage.getItem("tabs");
    if (tabs == null) {
      tabs = "";
    }
    return tabs;
  }

  public setLastActivityTime() {
    localStorage.setItem('lastActivityTime', JSON.stringify(new Date()));
  }

  public getLastActivityTime() {
    const data = localStorage.getItem('lastActivityTime');

    if (data && data !== null && data !== undefined) {
      return new Date(JSON.parse(data));
    }
    return null;
  }

  setLastTabCompanyCookie(company: any) {
    Cookie.set('lastTabCompany', company)
  }

  removeCookie() {
    Cookie.delete('3company', '/');
    Cookie.delete('11company', '/');
    Cookie.delete('12company', '/');
    Cookie.delete('16company', '/');
    // Cookie.deleteAll();
    // console.log(Cookie.getAll());
  }

  setCurrenstUserCokie(user: any) {
    Cookie.set('currentUser', JSON.stringify({ userFullName: user.userFullName, role: user.role, companyId: user.companyId, companyName: user.companyName, id: user.id, designaionName: user.designaionName, employeeId: user.employeeId, employeeCode: user.employeeCode }))
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getRMProject(): string {
    return Cookie.get('RMProjectId') as string
  }

  getVmsProject(): string {
    return Cookie.get('VMSProjectId') as string
  }

  getVendorRegProject(): string {
    return Cookie.get('VendorRegProjectId') as string
  }

  saveOlaToken(token: string): void {
    localStorage.setItem('olaToken', token);
  }

  getOlaToken(): string | null {
    return localStorage.getItem('olaToken');
  }


}
