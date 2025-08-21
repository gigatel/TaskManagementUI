import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { AdharOtp, EmpSaveSalary, EmployeePaggi, GetEmpVByDptDesignationsDd, GetEmployee, GetgstDetails, LeaveConfiq, Manager, SaveAssetDetails, SaveAssetDetailsByID, SaveBankDetails, SaveBankDetailsByID, SaveContact, SaveContactListByID, SaveDocument, SaveDocumentByID, SaveEmpSalaryByID, SaveEmployee, SaveFamliy, SaveFamliyByID, SaveQualification, SaveQualificationByID, getAssetById, getReturnEmpAsset, verifyAdhar } from "../models/employee-reg.models";

@Injectable({
  providedIn: 'root'
})

export class EmployeeregApiService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
  token = this.tokenStorageService.getLoginToken();
  auth_token = this.tokenStorageService.getToken();
  baseUrl = environment.apiUrl;

  //Employee reg Api
  SaveEmployeereg(payload: {}): Observable<SaveEmployee> {
    return this.http.post<SaveEmployee>(this.baseUrl + '/Employee/InsertUpdateEmployee', payload).pipe(map(res => res as SaveEmployee))
  }

  deleteEmployeereg(id: any): Observable<SaveEmployee> {
    return this.http.delete<SaveEmployee>(this.baseUrl + '/Employee/DeleteEmployee?id=' + id).pipe(map(res => res as SaveEmployee))
  }

  GetEmployeeById(id: any): Observable<GetEmployee> {
    return this.http.get<GetEmployee>(this.baseUrl + '/Employee/GetEmployeeById?id=' + id).pipe(map(res => res as GetEmployee))
  }

  GetEmployeeList(status: string): Observable<SaveEmployee> {
    return this.http.get<SaveEmployee>(this.baseUrl + '/Employee/GetEmployeeList?status=' + status).pipe(map(res => res as SaveEmployee))
  }

  EmployeePaggi(payload: {}): Observable<EmployeePaggi> {
    return this.http.post<EmployeePaggi>(this.baseUrl + '/Employee/GetEmployeePaggi', payload).pipe(map(res => res as EmployeePaggi))
  }

  getManager(): Observable<Manager> {
    return this.http.get<Manager>(this.baseUrl + '/Employee/GetManagerDd').pipe(map(res => res as Manager))
  }
  getleaveConfiq(): Observable<LeaveConfiq> {
    return this.http.get<LeaveConfiq>(this.baseUrl + "/LeaveType/GetLeaveConfigurationDd").pipe(map(res => res as LeaveConfiq))
  }

  GetEmpByDptDesignationsDd(departmentId: number, designationIds: string): Observable<GetEmpVByDptDesignationsDd> {
    return this.http.get<GetEmpVByDptDesignationsDd>(this.baseUrl + '/Employee/GetEmpByDptDesignationsDd?departmentId=' + departmentId + '&designationIds=' + designationIds).pipe(map(res => res as GetEmpVByDptDesignationsDd))
  }


  //contact details api
  SaveContactDetails(payload: {}): Observable<SaveContact> {
    return this.http.post<SaveContact>(this.baseUrl + '/Employee/InsertUpdateEmpContactDetails', payload).pipe(map(res => res as SaveContact))
  }

  GetContactDetailsByid(id: any): Observable<SaveContactListByID> {
    return this.http.get<SaveContactListByID>(this.baseUrl + '/Employee/GetContactDetailByEmpId?id=' + id).pipe(map(res => res as SaveContactListByID))
  }

  //famliy details api
  SaveFamliyDetails(payload: {}): Observable<SaveFamliy> {
    return this.http.post<SaveFamliy>(this.baseUrl + '/Employee/InsertUpdateEmpFamilyDetails', payload).pipe(map(res => res as SaveFamliy))
  }

  GetFamliyDetailsById(id: any): Observable<SaveFamliyByID> {
    return this.http.get<SaveFamliyByID>(this.baseUrl + '/Employee/GetFamilyDetailByEmpId?id=' + id).pipe(map(res => res as SaveFamliyByID))
  }

  //Documents details api
  SaveDocument(payload: {}): Observable<SaveDocument> {
    return this.http.post<SaveDocument>(this.baseUrl + '/Employee/InsertUpdateEmpDocumentDetails', payload).pipe(map(res => res as SaveDocument))
  }

  GetDocumentById(id: any): Observable<SaveDocumentByID> {
    return this.http.get<SaveDocumentByID>(this.baseUrl + '/Employee/GetDocumentDetailsByEmpId?id=' + id).pipe(map(res => res as SaveDocumentByID))
  }

  //Bank details api
  SaveBankDetails(payload: {}): Observable<SaveBankDetails> {
    return this.http.post<SaveBankDetails>(this.baseUrl + '/Employee/InsertUpdateEmpBankDetails', payload).pipe(map(res => res as SaveBankDetails))
  }

  GetBankDetailsById(id: any): Observable<SaveBankDetailsByID> {
    return this.http.get<SaveBankDetailsByID>(this.baseUrl + '/Employee/GetBankDetailsByEmpId?id=' + id).pipe(map(res => res as SaveBankDetailsByID))
  }

  //qualification api
  SaveQualification(payload: {}): Observable<SaveQualification> {
    return this.http.post<SaveQualification>(this.baseUrl + '/Employee/InsertUpdateEmpQualificationDetails', payload).pipe(map(res => res as SaveQualification))
  }

  GetQualificationById(id: any): Observable<SaveQualificationByID> {
    return this.http.get<SaveQualificationByID>(this.baseUrl + '/Employee/GetQualificationDetailsByEmpId?id=' + id).pipe(map(res => res as SaveQualificationByID))
  }

  //employee asset details api
  SaveAssetDetails(payload: {}): Observable<SaveAssetDetails> {
    return this.http.post<SaveAssetDetails>(this.baseUrl + '/Employee/InsertUpdateEmpAssetDetails', payload).pipe(map(res => res as SaveAssetDetails))
  }

  GetAssetDetailsById(id: any): Observable<SaveAssetDetailsByID> {
    return this.http.get<SaveAssetDetailsByID>(this.baseUrl + '/Employee/GetAssetDetailsByEmpId?id=' + id).pipe(map(res => res as SaveAssetDetailsByID))
  }

  getAssetById(id: any): Observable<getAssetById> {
    return this.http.get<getAssetById>(this.baseUrl + '/Employee/GetAssetDetailsById?id=' + id).pipe(map(res => res as getAssetById))
  }

  getReturnEmpAsset(payload: any): Observable<getReturnEmpAsset>{
    return this.http.post<getReturnEmpAsset>(this.baseUrl + '/Employee/ReturnEmpAsset',payload).pipe(map(res => res as getReturnEmpAsset))
  }

  //salary details api
  SaveUpdateSalaryDetails(payload: any): Observable<EmpSaveSalary> {
    return this.http.post<EmpSaveSalary>(this.baseUrl + "/Employee/InsertUpdateSalaryDetails", payload).pipe(map(res => res as EmpSaveSalary))
  }
  SaveUpdateSalaryDetailsById(id: any): Observable<EmpSaveSalary> {
    return this.http.get<EmpSaveSalary>(this.baseUrl + "/Employee/InsertUpdateSalaryDetails?id=" + id).pipe(map(res => res as EmpSaveSalary))
  }
  GetSalaryDetailsByempId(empId: number): Observable<EmpSaveSalary> {
    return this.http.get<EmpSaveSalary>(this.baseUrl + "/Employee/GetSalaryDetailsByEmpId?empId=" + empId).pipe(map(res => res as EmpSaveSalary))
  }
  GetSalaryDetailsById(id: number): Observable<SaveEmpSalaryByID> {
    return this.http.get<SaveEmpSalaryByID>(this.baseUrl + "/Employee/GetSalaryDetailById?id=" + id).pipe(map(res => res as SaveEmpSalaryByID))
  }
  deleteSalaryDetails(id: any): Observable<EmpSaveSalary> {
    return this.http.delete<EmpSaveSalary>(this.baseUrl + "/Employee/DeleteSalaryDetails?id=" + id).pipe(map(res => res as EmpSaveSalary))
  }


  //gstDetails and Aadhar api
  getGstDetails(gst: any): Observable<GetgstDetails> {
    return this.http.get<GetgstDetails>(this.baseUrl + "/Deepvue/GetGSTDetails?gst=" + gst).pipe(map(res => res as GetgstDetails))
  }

  getIfscDetails(ifsc: any): Observable<GetgstDetails> {
    return this.http.get<GetgstDetails>(this.baseUrl + "/Deepvue/GetIFSCDetails?ifsc=" + ifsc).pipe(map(res => res as GetgstDetails))
  }

  getAadharDetails(Adharno: any): Observable<GetgstDetails> {
    return this.http.get<GetgstDetails>(this.baseUrl + "/Deepvue/GetAadharDetails?aadhaar_number=" + Adharno).pipe(map(res => res as GetgstDetails))
  }

  verifyAccount(payload: {}): Observable<GetgstDetails> {
    return this.http.post<GetgstDetails>(this.baseUrl + "/Deepvue/VerifyAccount", payload).pipe(map(res => res as GetgstDetails))
  }

  genrateAadharSession(consent: string, purpose: string): Observable<GetgstDetails> {
    return this.http.get<GetgstDetails>(this.baseUrl + `/Deepvue/GenrateAadharSession?consent=${consent}&purpose=${purpose}`).pipe(map(res => res as GetgstDetails))
  }

  reloadAadharSession(session_id: any, consent: any, purpose: any): Observable<GetgstDetails> {
    return this.http.get<GetgstDetails>(this.baseUrl + `/Deepvue/RealodAadharSessionCaptcha?session_id=${session_id}&consent=${consent}&purpose=${purpose}`).pipe(map(res => res as GetgstDetails))
  }

  generateAadharOtp(payload: {}): Observable<AdharOtp> {
    return this.http.post<AdharOtp>(this.baseUrl + '/Deepvue/GenrateAadharOTP', payload).pipe(map(res => res as AdharOtp))
  }

  verifyAadharOtp(payload: {}): Observable<verifyAdhar> {
    return this.http.post<verifyAdhar>(this.baseUrl + '/Deepvue/VerifyAadharOTP', payload).pipe(map(res => res as verifyAdhar))
  }
}
