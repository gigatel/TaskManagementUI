import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { insertUpdateTaskSchedules, getTaskSchedulePaggi, getTaskScheduleById, deleteTaskSchedule, getTaskScheduledEmpDD } from '../models/task-management.models';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  constructor(private http: HttpClient) { }

  insertUpdateTaskSchedules(payload: any): Observable<insertUpdateTaskSchedules> {
    return this.http.post<insertUpdateTaskSchedules>(environment.apiUrl + '/TaskManagement/InsertUpdateTaskSchedules', payload).pipe(map(res => res as insertUpdateTaskSchedules))
  }

  getTaskSchedulePaggi(payload: any): Observable<getTaskSchedulePaggi>{
    return this.http.post<getTaskSchedulePaggi>(environment.apiUrl + '/TaskManagement/GetTaskSchedulePaggi', payload).pipe(map(res => res as getTaskSchedulePaggi))
  }

  getTaskScheduleById(id: number): Observable<getTaskScheduleById>{
    return this.http.get<getTaskScheduleById>(environment.apiUrl + '/TaskManagement/GetTaskScheduleById?id=' + id).pipe(map(res => res as getTaskScheduleById))
  }

  deleteTaskSchedule(id: number): Observable<deleteTaskSchedule>{
    return this.http.delete(environment.apiUrl + '/TaskManagement/DeleteTaskSchedule?id=' + id).pipe(map(res => res as deleteTaskSchedule))
  }

  getTaskScheduledEmpDD(): Observable<getTaskScheduledEmpDD>{
    return this.http.get<getTaskScheduledEmpDD>(environment.apiUrl + '/TaskManagement/GetTaskScheduledEmpDD').pipe(map(res => res as getTaskScheduledEmpDD))
  }

}
