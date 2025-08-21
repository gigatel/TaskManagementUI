import { Injectable } from '@angular/core';
import { PasswordEncryption, Roles, User, login } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { environment } from 'src/environments/environment';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    currentUser: Observable<any>;
    loinUser!: Observable<User>;
    // baseUrl = "http://10.100.2.44:8074/api";
    baseUrl = environment.apiUrl

    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    getOtp(payload: {}): Observable<login> {
        return this.http.post<login>(this.baseUrl + '/Account/GetOtp', payload).pipe(map(res => {
            return res as login;
        }))
    }

    login(payload: {}): Observable<login> {
        return this.http.post<login>(this.baseUrl + '/Account/Login', payload).pipe(map(res => res as login))
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('login-token');
        localStorage.removeItem('auth-token');
        this.currentUserSubject.next(null!);
    }

    getRoles(): Observable<Roles> {
        return this.http.get<Roles>(this.baseUrl + '/Account/GetRolesDd').pipe(map(res => res as Roles))
    }

    getPwdEncriptionKeyForUser(payload: any): Observable<PasswordEncryption>{
        return this.http.post<PasswordEncryption>(this.baseUrl + '/Account/GetPwdEncriptionKeyForUser', payload).pipe(map(res => res as PasswordEncryption))
    }
    
    createUser(payload: {}): Observable<User>{
        return this.http.post<User>(this.baseUrl + '/Account/InsertUsers', payload).pipe(map(res => res as User))
    }
    

}


