import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from "./token-storage.service";
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable, map } from "rxjs";
import { AssetByID, BranchByID, CompanyByID, DeductionList, DeleteEmailConfig, DeleteMessageConfig, DepartmentByID, DesignationByID, EmailConfigByID, EmailConfigPaggination, GetAssetById, GetSalaryFormulaById, GraceTimeByID, InsertUpdateEmailConfig, MessageConfigByID, MessageConfigPaggination, OrganisationByID, SalaryFormulaDeductionList, SaveAsset, SaveAssetType, SaveBranch, SaveCompany, SaveDepartment, SaveDesignation, SaveGraceTime, SaveOrganisation, SaveSalary, SaveShift, SaveZone, SaveloanAdvance, ShiftByID, ZoneByID, brancNameById, companyId, getCompanyBankById, getCompanyBankPaggination, getEmpAdditionalPolicy, insertUpdateBank, insertUpdateEmpAdditionalPolicy, insertUpdateMessageConfig, latePenalty, latePenalyPaggi, loanAdvancePagge, paggination } from "../models/employee-master.models";
import { get } from "lodash";


@Injectable({
  providedIn: 'root'
})

export class Apiservice {
  isShown = new BehaviorSubject(false);

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  token = this.tokenStorageService.getLoginToken();
  auth_token = this.tokenStorageService.getToken();
  baseUrl = environment.apiUrl;
  // httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth_token ? this.auth_token : this.token}` })
  // };

  // httpOption = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.auth_token}` })
  // };

  /// Select Company
  selectCompany(data: {}): Observable<companyId> {
    return this.http.post<companyId>(this.baseUrl + '/Account/SelectCompany', data).pipe(map(res => res as companyId))
  }

  // selectAllCompany(): Observable<SaveCompany> {
  //   return this.http.get<SaveCompany>(this.baseUrl + '/Company/GetCompanyList').pipe(map(res => res as SaveCompany))
  // }

  selectAllCompany(): Observable<SaveCompany> {
    return this.http.get<SaveCompany>(this.baseUrl + '/Policy/GetUserCompanyies').pipe(map(res => res as SaveCompany))
  }

  // Organsisation API
  saveOrganisation(data: {}): Observable<SaveOrganisation> {
    return this.http.post<SaveOrganisation>(this.baseUrl + '/Organization/InsertUpdateOrganization', data,).pipe(map(res => res as SaveOrganisation))
  }

  getAllOrganisation(): Observable<SaveOrganisation> {
    return this.http.get<SaveOrganisation>(this.baseUrl + '/Organization/GetOrganizationList',).pipe(map(res => res as SaveOrganisation))
  }

  getOrganisationById(id: any): Observable<OrganisationByID> {
    return this.http.get<OrganisationByID>(this.baseUrl + '/Organization/GetOrganizationById?id=' + id,).pipe(map(res => res as OrganisationByID))
  }

  deleteOrganisation(id: any): Observable<SaveOrganisation> {
    return this.http.delete<SaveOrganisation>(this.baseUrl + '/Organization/DeleteOrganization?id=' + id,).pipe(map(res => res as SaveOrganisation))
  }


  // Company API
  saveCompany(data: {}): Observable<SaveCompany> {
    return this.http.post<SaveCompany>(this.baseUrl + '/Company/InsertUpdateCompany', data,).pipe(map(res => res as SaveCompany))
  }

  getAllCompany(): Observable<SaveCompany> {
    return this.http.get<SaveCompany>(this.baseUrl + '/Company/GetCompanyList',).pipe(map(res => res as SaveCompany))
  }

  getCompanyById(id: any): Observable<CompanyByID> {
    return this.http.get<CompanyByID>(this.baseUrl + '/Company/GetCompanyById?id=' + id,).pipe(map(res => res as CompanyByID))
  }

  deleteCompany(id: any): Observable<SaveCompany> {
    return this.http.delete<SaveCompany>(this.baseUrl + '/Company/DeleteCompany?id=' + id,).pipe(map(res => res as SaveCompany))
  }

  companyPaggination(payload: {}): Observable<SaveCompany> {
    return this.http.post<SaveCompany>(this.baseUrl + '/Company/GetCompanyPaggi', payload,).pipe(map(res => res as SaveCompany))
  }



  // Branch Api
  saveBranch(data: {}): Observable<SaveBranch> {
    return this.http.post<SaveBranch>(this.baseUrl + '/Branch/InsertUpdateBranch', data,).pipe(map(res => res as SaveBranch))
  }

  getAllBranch(): Observable<SaveBranch> {
    return this.http.get<SaveBranch>(this.baseUrl + '/Branch/GetBranchList',).pipe(map(res => res as SaveBranch))
  }

  getBranchById(id: any): Observable<BranchByID> {
    return this.http.get<BranchByID>(this.baseUrl + '/Branch/GetBranchById?id=' + id,).pipe(map(res => res as BranchByID))
  }

  deleteBranch(id: any): Observable<SaveBranch> {
    return this.http.delete<SaveBranch>(this.baseUrl + '/Branch/DeleteBranch?id=' + id,).pipe(map(res => res as SaveBranch))
  }

  branchPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Branch/GetBranchPaggi', payload,).pipe(map(res => res as paggination))
  }

  getBranchNameByCompanyIDs(id: any): Observable<brancNameById> {
    return this.http.get<brancNameById>(this.baseUrl + '/Branch/GetBranchesByCompnayIds?companyIds=' + id,).pipe(map(res => res as brancNameById))
  }



  // Designation API
  saveDesignation(data: {}): Observable<SaveDesignation> {
    return this.http.post<SaveDesignation>(this.baseUrl + '/Designation/InsertUpdateDesignation', data).pipe(map(res => res as SaveDesignation))
  }

  getAllDesignation(): Observable<SaveDesignation> {
    return this.http.get<SaveDesignation>(this.baseUrl + '/Designation/GetDesignationList').pipe(map(res => res as SaveDesignation))
  }

  getDesignationById(id: any): Observable<DesignationByID> {
    return this.http.get<DesignationByID>(this.baseUrl + '/Designation/GetDesignationById?id=' + id).pipe(map(res => res as DesignationByID))
  }

  deleteDesignation(id: any): Observable<SaveDesignation> {
    return this.http.delete<SaveDesignation>(this.baseUrl + '/Designation/DeleteDesignation?id=' + id).pipe(map(res => res as SaveDesignation))
  }

  designationPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Designation/GetDesignationPaggi', payload).pipe(map(res => res as paggination))
  }

  addUpdateDepartmentDesignation(payload: {}): Observable<SaveDesignation> {
    return this.http.post<SaveDesignation>(this.baseUrl + '/Designation/AddUpdateDepartmentDesignations', payload).pipe(map(res => res as SaveDesignation))
  }

  getDeptDesignationByCompanyId(payload: {}): Observable<SaveDesignation> {
    return this.http.post<SaveDesignation>(this.baseUrl + '/Designation/GetDptDesgByComapnyId', payload).pipe(map(res => res as SaveDesignation))
  }

  addDepartmentDesignation(payload: {}): Observable<SaveDesignation> {
    return this.http.post<SaveDesignation>(this.baseUrl + '/Designation/AddDepartmentDesignation', payload).pipe(map(res => res as SaveDesignation))
  }

  deleteDepartmentDesignation(id: any): Observable<SaveDesignation> {
    return this.http.delete<SaveDesignation>(this.baseUrl + '/Designation/DeleteDepartmentDesignation?id=' + id).pipe(map(res => res as SaveDesignation))
  }

  getDesignationByCompanyAndBranchId(comapnyID: any, branchID: any): Observable<SaveDesignation> {
    return this.http.get<SaveDesignation>(this.baseUrl + '/Designation/GetDesignationByComapnyAndBranchId?companyId=' + comapnyID + '&' + 'branchId=' + branchID).pipe(map(res => res as SaveDesignation))

  }

  getDesignationByCompanyId(): Observable<SaveDesignation> {
    return this.http.get<SaveDesignation>(this.baseUrl + '/Designation/GetDesignationByComapnyId').pipe(map(res => res as SaveDesignation))
  }

  //department API
  saveDepartment(data: {}): Observable<SaveDepartment> {
    return this.http.post<SaveDepartment>(this.baseUrl + '/Department/InsertUpdateDepartment', data).pipe(map(res => res as SaveDepartment))
  }

  getAllDepartment(): Observable<SaveDepartment> {
    return this.http.get<SaveDepartment>(this.baseUrl + '/Department/GetDepartmentList').pipe(map(res => res as SaveDepartment))
  }

  getDepartmentById(id: any): Observable<DepartmentByID> {
    return this.http.get<DepartmentByID>(this.baseUrl + '/Department/GetDepartmentById?id=' + id,).pipe(map(res => res as DepartmentByID))
  }

  deleteDepartment(id: any): Observable<SaveDepartment> {
    return this.http.delete<SaveDepartment>(this.baseUrl + '/Department/DeleteDepartment?id=' + id,).pipe(map(res => res as SaveDepartment))
  }

  // deleteDepartment(payload: {}): Observable<SaveDepartment> {
  //   return this.http.post<SaveDepartment>(this.baseUrl + '/Department/RemoveDepartmentFromCompanyBranch', payload).pipe(map(res => res as SaveDepartment))
  // }

  getDepartmentBYCompanyID(): Observable<SaveDepartment> {
    return this.http.get<SaveDepartment>(this.baseUrl + '/Department/GetDepartmentByComapnyId').pipe(map(res => res as SaveDepartment))
  }

  departmentPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Department/GetDepartmentPaggi', payload).pipe(map(res => res as paggination))
  }

  getDepartmentByCompanyIDAndBranchID(comapnyID: any, branchID: any): Observable<SaveDepartment> {
    return this.http.get<SaveDepartment>(this.baseUrl + '/Department/GetDepartmentByComapnyAndBranchId?companyId=' + comapnyID + '&' + 'branchId=' + branchID).pipe(map(res => res as SaveDepartment))
  }


  //Grace Time
  saveGraceTime(data: {}): Observable<SaveGraceTime> {
    return this.http.post<SaveGraceTime>(this.baseUrl + '/AttPolicy/InsertUpdateAttPolicy', data,).pipe(map(res => res as SaveGraceTime))
  }

  getAllGraceTime(): Observable<SaveGraceTime> {
    return this.http.get<SaveGraceTime>(this.baseUrl + '/AttPolicy/GetAttPolicyList?').pipe(map(res => res as SaveGraceTime))
  }

  getGraceTimeById(id: any): Observable<GraceTimeByID> {
    return this.http.get<GraceTimeByID>(this.baseUrl + '/AttPolicy/GetAttPolicyById?id=' + id,).pipe(map(res => res as GraceTimeByID))
  }

  deleteGraceTime(id: any): Observable<SaveGraceTime> {
    return this.http.delete<SaveGraceTime>(this.baseUrl + '/AttPolicy/DeleteAttPolicy?id=' + id,).pipe(map(res => res as SaveGraceTime))
  }

  // deleteGraceTime(payload: {}): Observable<SaveGraceTime> {
  //   return this.http.post<SaveGraceTime>(this.baseUrl + '/AttPolicy/RemoveAttPolicyFromCompanyBranch', payload).pipe(map(res => res as SaveGraceTime))
  // }

  GraceTimePaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/AttPolicy/GetAttPolicyPaggi', payload,).pipe(map(res => res as paggination))
  }

  //Shift

  saveShift(data: {}): Observable<SaveShift> {
    return this.http.post<SaveShift>(this.baseUrl + '/Shift/InsertUpdateShift', data,).pipe(map(res => res as SaveShift))
  }

  getAllShift(): Observable<SaveShift> {
    return this.http.get<SaveShift>(this.baseUrl + '/Shift/GetShiftList').pipe(map(res => res as SaveShift))
  }

  getShiftById(id: any): Observable<ShiftByID> {
    return this.http.get<ShiftByID>(this.baseUrl + '/Shift/GetShiftById?id=' + id,).pipe(map(res => res as ShiftByID))
  }

  deleteShift(id: any): Observable<SaveShift> {
    return this.http.delete<SaveShift>(this.baseUrl + '/Shift/DeleteShift?id=' + id,).pipe(map(res => res as SaveShift))
  }
  // deleteShift(payload: {}): Observable<SaveShift> {
  //   return this.http.post<SaveShift>(this.baseUrl + '/Shift/RemoveShiftFromCompanyBranch', payload).pipe(map(res => res as SaveShift))
  // }

  shiftPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Shift/GetShiftPaggi', payload,).pipe(map(res => res as paggination))
  }

  getShiftAttPolicyByCompanyAndBranchId(payload: {}): Observable<ShiftByID> {
    return this.http.post<ShiftByID>(this.baseUrl + '/Shift/GetShiftAttPolicyByComapnyAndBranchIds', payload,).pipe(map(res => res as ShiftByID))
  }

  addShiftAttPolicy(payload: {}): Observable<SaveShift> {
    return this.http.post<SaveShift>(this.baseUrl + '/Shift/AddShiftAttPolicy', payload,).pipe(map(res => res as SaveShift))
  }



  // Zone
  saveZone(data: {}): Observable<SaveZone> {
    return this.http.post<SaveZone>(this.baseUrl + '/Zone/InsertUpdateZone', data,).pipe(map(res => res as SaveZone))
  }

  getAllZone(): Observable<SaveZone> {
    return this.http.get<SaveZone>(this.baseUrl + '/Zone/GetZoneList').pipe(map(res => res as SaveZone))
  }

  getZoneById(id: any): Observable<ZoneByID> {
    return this.http.get<ZoneByID>(this.baseUrl + '/Zone/GetZoneById?id=' + id,).pipe(map(res => res as ZoneByID))
  }

  deleteZone(id: any): Observable<SaveZone> {
    return this.http.delete<SaveZone>(this.baseUrl + '/Zone/DeleteZone?id=' + id,).pipe(map(res => res as SaveZone))
  }
  // deleteZone(payload: {}): Observable<SaveZone> {
  //   return this.http.post<SaveZone>(this.baseUrl + '/Zone/RemoveZoneFromCompanyBranch', payload).pipe(map(res => res as SaveZone))
  // }

  ZonePaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Zone/GetZonePaggi', payload,).pipe(map(res => res as paggination))
  }



  //Asset Type
  saveAssetType(data: {}): Observable<SaveAssetType> {
    return this.http.post<SaveAssetType>(this.baseUrl + '/AssetType/InsertUpdateAssetType', data,).pipe(map(res => res as SaveAssetType))
  }

  getAllAssetType(): Observable<SaveAssetType> {
    return this.http.get<SaveAssetType>(this.baseUrl + '/AssetType/GetAssetTypeList').pipe(map(res => res as SaveAssetType))

  }

  getAssetTypeById(id: string): Observable<GetAssetById> {
    return this.http.get<GetAssetById>(this.baseUrl + "/AssetType/GetAssetTypeById?id=" + id).pipe(map(res =>
      res as GetAssetById))
  }

  deleteAssetType(id: any): Observable<SaveAssetType> {
    return this.http.delete<SaveAssetType>(this.baseUrl + '/AssetType/DeleteAssetType?id=' + id).pipe(map(res => res as SaveAssetType))
  }

  AssetTypePaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/AssetType/GetAssetTypePaggi', payload).pipe(map(res => res as paggination))
  }

  getAssetTypeByCompanyID(): Observable<GetAssetById> {
    return this.http.get<GetAssetById>(this.baseUrl + "/AssetType/GetAssetTypeByComapnyId").pipe(map(res =>
      res as GetAssetById))
  }



  // Asset
  saveAsset(data: {}): Observable<SaveAsset> {
    return this.http.post<SaveAsset>(this.baseUrl + '/Asset/InsertUpdateAsset', data,).pipe(map(res => res as SaveAsset))
  }

  getAllAsset(assetTypeId: any): Observable<SaveAsset> {
    return this.http.get<SaveAsset>(this.baseUrl + '/Asset/GetAssetList?assetTypeId=' + assetTypeId).pipe(map(res => res as SaveAsset))
  }

  getAssetById(id: any): Observable<AssetByID> {
    return this.http.get<AssetByID>(this.baseUrl + '/Asset/GetAssetById?id=' + id,).pipe(map(res => res as AssetByID))
  }

  deleteAsset(id: any): Observable<SaveAsset> {
    return this.http.delete<SaveAsset>(this.baseUrl + '/Asset/DeleteAsset?id=' + id).pipe(map(res => res as SaveAsset))
  }

  AssetPaggination(payload: {}): Observable<paggination> {
    return this.http.post<paggination>(this.baseUrl + '/Asset/GetAssetPaggi', payload).pipe(map(res => res as paggination))
  }




  //salary formula api
  SaveUpdateSubheadingSalary(payload: {}): Observable<SaveSalary> {
    return this.http.post<SaveSalary>(this.baseUrl + '/SalaryFormula/InsertUpdateFormulaWithSubHeadings', payload).pipe(map(res => res as SaveSalary))
  }

  SaveUpdateDeductionSalary(payload: {}): Observable<SaveSalary> {
    return this.http.post<SaveSalary>(this.baseUrl + '/SalaryFormula/InsertUpdateDeductionSubHeadings', payload).pipe(map(res => res as SaveSalary))
  }

  deleteSubheadingSalary(id: any): Observable<SaveSalary> {
    return this.http.delete<SaveSalary>(this.baseUrl + '/SalaryFormula/DeleteSubHeading?id=' + id).pipe(map(res => res as SaveSalary))
  }

  deleteDeductionSalary(id: any): Observable<SaveSalary> {
    return this.http.delete<SaveSalary>(this.baseUrl + '/SalaryFormula/DeleteDeduction?id=' + id).pipe(map(res => res as SaveSalary))
  }

  deleteFormula(id: any): Observable<SaveSalary> {
    return this.http.delete<SaveSalary>(this.baseUrl + '/SalaryFormula/DeleteSalaryFormula?id=' + id).pipe(map(res => res as SaveSalary))
  }

  GetsalaryFormulaByID(id: any): Observable<GetSalaryFormulaById> {
    return this.http.get<GetSalaryFormulaById>(this.baseUrl + '/SalaryFormula/GetSalaryFormulaById?id=' + id).pipe(map(res => res as GetSalaryFormulaById))
  }

  GetsalarFormulaList(): Observable<SaveSalary> {
    return this.http.get<SaveSalary>(this.baseUrl + '/SalaryFormula/GetSalaryFormulaList').pipe(map(res => res as SaveSalary))
  }

  GetFormulaWithDeductionById(id: any): Observable<GetSalaryFormulaById> {
    return this.http.get(this.baseUrl + '/SalaryFormula/GetFormulaWithDeductionTypesById?id=' + id).pipe(map(res => res as GetSalaryFormulaById))
  }

  GetSalaryFormulaWithDeductionList(): Observable<SalaryFormulaDeductionList> {
    return this.http.get(this.baseUrl + '/SalaryFormula/GetSalaryFormulaWithDeductionsList').pipe(map(res => res as SalaryFormulaDeductionList))
  }

  //loan advance api
  SaveUpdateLoanAdvanceCredit(payload: {}): Observable<SaveloanAdvance> {
    return this.http.post<SaveloanAdvance>(this.baseUrl + '/LoanAdvance/InsertUpdateCredit', payload).pipe(map(res => res as SaveloanAdvance))
  }

  SaveUpdateLoanAdvanceDebit(payload: {}): Observable<SaveloanAdvance> {
    return this.http.post<SaveloanAdvance>(this.baseUrl + '/LoanAdvance/InsertUpdateDedit', payload).pipe(map(res => res as SaveloanAdvance))
  }

  deleteCreditLoanAdvance(id: any): Observable<SaveloanAdvance> {
    return this.http.delete<SaveloanAdvance>(this.baseUrl + '/LoanAdvance/DeleteCredit?id=' + id).pipe(map(res => res as SaveloanAdvance))

  }
  deleteDebitLoanAdvance(id: any): Observable<SaveloanAdvance> {
    return this.http.delete<SaveloanAdvance>(this.baseUrl + "/LoanAdvance/DeleteDedit?id=" + id).pipe(map(res => res as SaveloanAdvance))
  }

  loanAdvancePaggination(payload: {}): Observable<loanAdvancePagge> {
    return this.http.post<SaveloanAdvance>(this.baseUrl + "/LoanAdvance/GetDeditCreditPaggi", payload).pipe(map(res => res as loanAdvancePagge))
  }

  //late penalty api
  latePenaltyInsetUpt(payload: []): Observable<latePenalty> {
    return this.http.post<latePenalty>(this.baseUrl + '/LatePenalty/InsertUpdateLatePenalty', payload).pipe(map(res => res as latePenalty));
  };

  deletePenalty(id: any): Observable<latePenalty> {
    return this.http.delete<latePenalty>(this.baseUrl + '/LatePenalty/DeleteLatePenalty?id=' + id).pipe(map(res => res as latePenalty));
  };
  deletePenaltyConfiquration(id: any): Observable<latePenalty> {
    return this.http.delete<latePenalty>(this.baseUrl + '/LatePenalty/DeleteLatePenaltyConfiguration?id=' + id).pipe(map(res => res as latePenalty))
  }

  getPenaltyById(id: any): Observable<latePenalty> {
    return this.http.get<latePenalty>(this.baseUrl + '/LatePenalty/GetLatePenaltyById?id=' + id).pipe(map(res => res as latePenalty));
  };

  getPenaltyList(): Observable<latePenalty> {
    return this.http.get<latePenalty>(this.baseUrl + '/LatePenalty/GetLatePenaltyList').pipe(map(res => res as latePenalty));
  };

  getPeanltyPaggination(payload: {}): Observable<latePenalyPaggi> {
    return this.http.post<latePenalyPaggi>(this.baseUrl + "/LatePenalty/GetLatePenaltyPaggi", payload).pipe(map(res => res as latePenalyPaggi));
  };

  latePenaltyGetByCompanyId(id: any): Observable<latePenalty> {
    return this.http.get<latePenalty>(this.baseUrl + "/LatePenalty/GetLatePenaltyByComapnyId?id=" + id).pipe(map(res => res as latePenalty));
  };

  /// Message Config
  messageConfigInsertUpdate(payload: {}): Observable<insertUpdateMessageConfig> {
    return this.http.post<insertUpdateMessageConfig>(this.baseUrl + '/MessageConfig/InsertUpdateMessageConfig', payload).pipe(map(res => res as insertUpdateMessageConfig));
  };

  deleteMessageConfig(id: number): Observable<DeleteMessageConfig> {
    return this.http.delete<DeleteMessageConfig>(this.baseUrl + '/MessageConfig/DeleteMessageConfig?id=' + id).pipe(map(res => res as DeleteMessageConfig));
  };

  getMessageConfigById(id: number): Observable<MessageConfigByID> {
    return this.http.get<MessageConfigByID>(this.baseUrl + '/MessageConfig/GetMessageConfigById?id=' + id).pipe(map(res => res as MessageConfigByID));
  };

  getMessageConfigList(): Observable<insertUpdateMessageConfig> {
    return this.http.get<insertUpdateMessageConfig>(this.baseUrl + '/MessageConfig/GetMessageConfigList').pipe(map(res => res as insertUpdateMessageConfig));
  };

  getMessageConfigPaggination(payload: {}): Observable<MessageConfigPaggination> {
    return this.http.post<MessageConfigPaggination>(this.baseUrl + "/MessageConfig/GetMessageConfigPaggi", payload).pipe(map(res => res as MessageConfigPaggination));
  };

  getMessageConfigByCompanyID(id: number): Observable<MessageConfigByID> {
    return this.http.get<MessageConfigByID>(this.baseUrl + "/MessageConfig/GetMessageConfigByComapnyId?id=" + id).pipe(map(res => res as MessageConfigByID));
  };

  //company bank api
  insertUpdateCompanyBank(payload: {}): Observable<insertUpdateBank> {
    return this.http.post<insertUpdateBank>(this.baseUrl + "/Company/InsertUpdateCompanyBank", payload).pipe(map(res => res as insertUpdateBank))
  }

  getCompanyBankById(id: any): Observable<getCompanyBankById> {
    return this.http.get<getCompanyBankById>(this.baseUrl + '/Company/GetCompanyBankById?id=' + id).pipe(map(res => res as getCompanyBankById))
  }

  deleteCompanyBank(id: any): Observable<insertUpdateBank> {
    return this.http.delete<insertUpdateBank>(this.baseUrl + '/Company/DeleteCompanyBank?id=' + id).pipe(map(res => res as insertUpdateBank))
  }

  companyBankPaggination(payload: {}): Observable<getCompanyBankPaggination> {
    return this.http.post<getCompanyBankPaggination>(this.baseUrl + '/Company/GetCompanyBankPaggi', payload).pipe(map(res => res as getCompanyBankPaggination))
  }

  //Email Config Api
  insertUpdateEmailConfig(payload: {}): Observable<InsertUpdateEmailConfig> {
    return this.http.post<InsertUpdateEmailConfig>(this.baseUrl + '/EmailConfig/InsertUpdateEmailConfig', payload).pipe(map(res => res as InsertUpdateEmailConfig));
  };

  deleteEmailConfig(id: number): Observable<DeleteEmailConfig> {
    return this.http.delete<DeleteEmailConfig>(this.baseUrl + '/EmailConfig/DeleteEmailConfig?id=' + id).pipe(map(res => res as DeleteEmailConfig));
  };

  getEmailConfigById(id: number): Observable<EmailConfigByID> {
    return this.http.get<EmailConfigByID>(this.baseUrl + '/EmailConfig/GetEmailConfigById?id=' + id).pipe(map(res => res as EmailConfigByID));
  };

  getEmailConfigList(): Observable<InsertUpdateEmailConfig> {
    return this.http.get<InsertUpdateEmailConfig>(this.baseUrl + '/EmailConfig/GetEmailConfigList').pipe(map(res => res as InsertUpdateEmailConfig));
  };

  getEmailConfigPaggi(payload: {}): Observable<EmailConfigPaggination> {
    return this.http.post<EmailConfigPaggination>(this.baseUrl + "/EmailConfig/GetEmailConfigPaggi", payload).pipe(map(res => res as EmailConfigPaggination));
  };

  getEmailConfigByComapnyId(id: number): Observable<EmailConfigByID> {
    return this.http.get<EmailConfigByID>(this.baseUrl + "/EmailConfig/GetEmailConfigByComapnyId?id=" + id).pipe(map(res => res as EmailConfigByID));
  };

  getOlaToken(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/OlaAuth/GetOlaToken').pipe(map(res => res as any));
  };

  //////// EMPLOYEE POLICY
  insertUpdateEmpAdditionalPolicy(payload: {}): Observable<insertUpdateEmpAdditionalPolicy> {
    return this.http.post<insertUpdateEmpAdditionalPolicy>(this.baseUrl + '/Employee/InsertUpdateEmpAdditionalPolicy',payload).pipe(map(res => res as insertUpdateEmpAdditionalPolicy));
  }

  getEmpAdditionalPolicy(empId: number): Observable<getEmpAdditionalPolicy> {
    return this.http.get<getEmpAdditionalPolicy>(this.baseUrl + '/Employee/GetEmpAdditionalPolicy?empId=' + empId).pipe(map(res => res as getEmpAdditionalPolicy));
  }


}


