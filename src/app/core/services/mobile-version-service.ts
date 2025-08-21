import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { MVBaseRes } from "../models/mobile-version-models";

@Injectable({
    providedIn: 'root'
  })
  
  export class MobileVersionApiService {

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
    token = this.tokenStorageService.getLoginToken();
    auth_token = this.tokenStorageService.getToken();
    baseUrl = environment.apiUrl;

    GetMobileAppTypesDd(): Observable<MVBaseRes> {
        return this.http.get<MVBaseRes>(this.baseUrl + '/MobileAppVersions/GetMobileAppTypesDd').pipe(map(res => res as MVBaseRes))
      }
      InsertUpdateMobileAppVersions(payload:{}): Observable<MVBaseRes> {
        return this.http.post<MVBaseRes>(this.baseUrl + '/MobileAppVersions/InsertUpdateMobileAppVersions',payload).pipe(map(res => res as MVBaseRes))
      }
      DeleteMobileAppVersions(id:any): Observable<MVBaseRes> {
        return this.http.delete<MVBaseRes>(this.baseUrl + '/MobileAppVersions/DeleteMobileAppVersions?id='+id).pipe(map(res => res as MVBaseRes))
      }
      GetMobileAppVersionsById(id:any): Observable<MVBaseRes> {
        return this.http.get<MVBaseRes>(this.baseUrl + '/MobileAppVersions/GetMobileAppVersionsById?id='+id).pipe(map(res => res as MVBaseRes))
      }
      GetMobileAppVersionsPaggi(payload:{}): Observable<MVBaseRes> {
        return this.http.post<MVBaseRes>(this.baseUrl + '/MobileAppVersions/GetMobileAppVersionsPaggi',payload).pipe(map(res => res as MVBaseRes))
      }
  }