import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveProject } from '../models/policy-master.models';

@Injectable({
  providedIn: 'root'
})
export class PolicyMasterService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  insertUpdateProject(data: {}): Observable<SaveProject>{
    return this.http.post<SaveProject>(this.baseUrl + '/Policy/InsertUpdateProject', data).pipe(map(res => res as SaveProject))
  }

  deleteProject(id: any): Observable<SaveProject>{
    return this.http.delete<SaveProject>(this.baseUrl + '').pipe(map(res => res as SaveProject))
  }
}
