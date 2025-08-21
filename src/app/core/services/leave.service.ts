
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { GetLeaveById, LeaveConfiguration, LeaveConfigurationByID, LeaveRequest, LeaveRequestPaggi, LeaverequestById, SaveLeaveType } from "../models/leave.models";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { paggination } from "../models/employee-master.models";

@Injectable({
  providedIn: 'root'
})

export class LeaveService {
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }
  token = this.tokenStorageService.getLoginToken();
  auth_token = this.tokenStorageService.getToken();
  baseUrl = environment.apiUrl;

  //Leave Type
  saveLeaveType(data: {}): Observable<SaveLeaveType> {
    return this.http.post<SaveLeaveType>(this.baseUrl + '/LeaveType/InsertUpdateLeaveType', data,).pipe(map(res => res as SaveLeaveType))
  }

  getAllLeaveType(): Observable<SaveLeaveType> {
    return this.http.get<SaveLeaveType>(this.baseUrl + '/LeaveType/GetLeaveTypeList').pipe(map(res => res as SaveLeaveType))

  }

  getLeaveTypeById(id: string): Observable<GetLeaveById> {
    return this.http.get<GetLeaveById>(this.baseUrl + "/LeaveType/GetLeaveTypeById?id=" + id).pipe(map(res =>
      res as GetLeaveById))
  }

  deleteLeaveType(id: any): Observable<SaveLeaveType> {
    return this.http.delete<SaveLeaveType>(this.baseUrl + '/LeaveType/DeleteLeaveType?id=' + id).pipe(map(res => res as SaveLeaveType))
  }

  LeaveTypePaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/LeaveType/GetLeaveTypePaggi', payload).pipe(map(res => res as paggination))
  }

  getLeaveTypeByCompanyID(): Observable<GetLeaveById> {
    return this.http.get<GetLeaveById>(this.baseUrl + "/LeaveType/GetLeaveTypeByComapnyId").pipe(map(res =>
      res as GetLeaveById))
  }

  //Leave Configuration
  saveLeaveConfiguration(data: []): Observable<LeaveConfiguration> {
    return this.http.post<LeaveConfiguration>(this.baseUrl + '/LeaveType/InsertUpdateLeaveConfiguration', data).pipe(map(res => res as LeaveConfiguration))
  }

  getAllLeaveConfiguration(): Observable<LeaveConfiguration> {
    return this.http.get<LeaveConfiguration>(this.baseUrl + '/LeaveType/GetLeaveConfigurationList').pipe(map(res => res as LeaveConfiguration))
  }

  getLeaveConfigurationById(id: string): Observable<LeaveConfigurationByID> {
    return this.http.get<LeaveConfigurationByID>(this.baseUrl + "/LeaveType/GetLeaveConfigurationById?id=" + id).pipe(map(res =>
      res as LeaveConfigurationByID))
  }

  deleteLeaveConfiguration(id: any): Observable<LeaveConfiguration> {
    return this.http.delete<LeaveConfiguration>(this.baseUrl + '/LeaveType/DeleteLeaveConfiguration?id=' + id).pipe(map(res => res as LeaveConfiguration))
  }

  deleteLeaveFormula(id: any): Observable<LeaveConfiguration> {
    return this.http.delete<LeaveConfiguration>(this.baseUrl + '/LeaveType/DeleteLeaveFormula?id=' + id).pipe(map(res => res as LeaveConfiguration))
  }

  LeaveConfigurationPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/LeaveType/GetLeaveConfigurationPaggi', payload).pipe(map(res => res as paggination))
  }

  //Leave Request Api
  LeaverequestInsertUp(payload: {}): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.baseUrl + '/LeaveType/InsertUpdateEmpLeaveRequest', payload).pipe(map(res => res as LeaveRequest))
  }

  LeaverequestGetById(id:any):Observable<LeaverequestById>{
    return this.http.get< LeaverequestById>(this.baseUrl + `/LeaveType/GetEmployeeLeaveRequestById?id=${id}`).pipe(map(res=>res as  LeaverequestById))
  }
  LeaveRequestApproveRej(payload: {}): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.baseUrl + '/LeaveType/ApproveRejectEmpLeaveRequest', payload).pipe(map(res => res as LeaveRequest))
  }

  LeaveRequestPaggi(payload: {}): Observable<LeaveRequestPaggi> {
    return this.http.post<LeaveRequestPaggi>(this.baseUrl + '/LeaveType/GetEmployeeLeaveRequestPaggi', payload).pipe(map(res => res as LeaveRequestPaggi))
  }

}
