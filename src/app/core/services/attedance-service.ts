import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { AttendenceLog, BaseDailyAttendenceRes, BaseRes, EditAttendanceEmpDD, EmpAttendece, EmpPunchLogsByDateRangeDateRangeRes, EmployeeDd, EmployeeLeaveTyepDd, EmployeeLeaveTyepRes, LockApproveStatusRes } from "../models/attedance-models";

@Injectable({
    providedIn: 'root'
  })
  
  export class AttedanceApiService {

    constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
    token = this.tokenStorageService.getLoginToken();
    auth_token = this.tokenStorageService.getToken();
    baseUrl = environment.apiUrl;

    GetMonthAttendenceList(payload: {}): Observable<BaseDailyAttendenceRes> {
        return this.http.post<BaseDailyAttendenceRes>(this.baseUrl + '/Attendance/AllEmpMonthViewInOutReportPaggi',payload).pipe(map(res => res as BaseDailyAttendenceRes))
      }
    GetDayAttendenceList(payload: {}): Observable<BaseDailyAttendenceRes> {
        return this.http.post<BaseDailyAttendenceRes>(this.baseUrl + '/Attendance/AllEmpDayViewInOutReportPaggi',payload).pipe(map(res => res as BaseDailyAttendenceRes))
    }
    GetEmployeeDd(): Observable<EmployeeDd> {
        return this.http.get<EmployeeDd>(this.baseUrl + '/Employee/GetEmpDd').pipe(map(res => res as EmployeeDd))
      }
      GetEmpWithShiftDd(): Observable<EmployeeDd> {
        return this.http.get<EmployeeDd>(this.baseUrl + '/Employee/GetEmpWithShiftDd').pipe(map(res => res as EmployeeDd))
      }
      GetEmpWithShiftOfDateDd(punchTime:any): Observable<EmployeeDd> {
        return this.http.get<EmployeeDd>(this.baseUrl + '/Employee/GetEmpWithShiftOfDateDd?punchTime='+punchTime).pipe(map(res => res as EmployeeDd))
      }
      GetEmpByDptDesignationDd(departmentId:any,designationId:any): Observable<EmployeeDd> {
        return this.http.get<EmployeeDd>(this.baseUrl + '/Employee/GetEmpByDptDesignationDd?departmentId='+departmentId+'&designationId='+designationId).pipe(map(res => res as EmployeeDd))
      }
      GetEmpByDptDesignationsDd(departmentId:any,designationIds:any): Observable<EmployeeDd> {
        return this.http.get<EmployeeDd>(this.baseUrl + '/Employee/GetEmpByDptDesignationsDd?departmentId='+departmentId+'&designationIds='+designationIds).pipe(map(res => res as EmployeeDd))
      }
     SaveEditAttendence(payload: {}): Observable<BaseRes> {
        return this.http.post<BaseRes>(this.baseUrl + '/Attendance/InsertUpdateAttendanceProp',payload).pipe(map(res => res as BaseRes))
      }
      LockAttendence(payload: {}): Observable<BaseRes> {
        return this.http.post<BaseRes>(this.baseUrl + '/Attendance/LockAttendance',payload).pipe(map(res => res as BaseRes))
      }
      UnLockAttendence(payload: {}): Observable<BaseRes> {
        return this.http.post<BaseRes>(this.baseUrl + '/Attendance/UnLockAttendance',payload).pipe(map(res => res as BaseRes))
      }
      ApproveAttendence(payload: {}): Observable<EmployeeDd> {
        return this.http.post<BaseRes>(this.baseUrl + '/Attendance/ApproveAttendance',payload).pipe(map(res => res as BaseRes))
      }
      GetLockApproveStatus(payload: {}): Observable<LockApproveStatusRes> {
        return this.http.post<LockApproveStatusRes>(this.baseUrl + '/Attendance/GetLockApproveStatus',payload).pipe(map(res => res as LockApproveStatusRes))
      }
      ViewInOutReportInDateRange(payload: {}): Observable<BaseDailyAttendenceRes> {
        return this.http.post<BaseDailyAttendenceRes>(this.baseUrl + '/Attendance/ViewInOutReportInDateRange',payload).pipe(map(res => res as BaseDailyAttendenceRes))
      }
      EmpPunchLogsByDateRangeDateRange(payload: {}): Observable<EmpPunchLogsByDateRangeDateRangeRes> {
        return this.http.post<EmpPunchLogsByDateRangeDateRangeRes>(this.baseUrl + '/Attendance/EmpPunchLogsByDateRangeDateRange',payload).pipe(map(res => res as EmpPunchLogsByDateRangeDateRangeRes))
      }
      GetEmployeeLeaveTyepDd(empId:any): Observable<EmployeeLeaveTyepRes> {
        return this.http.get<EmployeeLeaveTyepRes>(this.baseUrl + '/LeaveType/GetEmployeeLeaveTyepDd?empId='+empId).pipe(map(res => res as EmployeeLeaveTyepRes))
      }

      lockEmpAttendence(payload: {}): Observable<EmpAttendece>{
        return this.http.post<EmpAttendece>(this.baseUrl + '/Attendance/LockEmpAttendance', payload).pipe(map(res => res as EmpAttendece))
      }

      unlockEmpAttendence(payload: {}): Observable<EmpAttendece>{
        return this.http.post<EmpAttendece>(this.baseUrl + '/Attendance/UnLockEmpAttendance', payload).pipe(map(res => res as EmpAttendece))
      }
      syncAttendance(fromTime:any,toTime:any): Observable<any> {
        return this.http.get<BaseRes>(this.baseUrl + '/Attendance/SyncAttendance?fromTime='+fromTime+"&toTime="+toTime).pipe(map(res => res))
      }
      getAttendenceEditLog(payload: {}): Observable<AttendenceLog>{
        return this.http.post<AttendenceLog>(this.baseUrl + '/Attendance/GetAttendanceEditLog', payload).pipe(map(res => res as AttendenceLog))
      }

      getEditAttendanceEmpsDD(fromDate: string, toDate: string): Observable<EditAttendanceEmpDD>{
        return this.http.get<EditAttendanceEmpDD>(this.baseUrl + '/Attendance/GetEditAttendanceEmpsDD?fromDate=' + fromDate + '&toDate=' + toDate ).pipe(map(res => res as EditAttendanceEmpDD))
      }

      getShiftStartEndTime(siftId: number,date: string ): Observable<any> {
        return this.http.get<any>(environment.apiUrl + '/Attendance/GetShiftStartEndTimeForDate?siftId=' + siftId + '&date=' + date).pipe(map(res => res as any))
      }



  }