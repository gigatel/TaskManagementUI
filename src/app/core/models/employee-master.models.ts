export interface companyId {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: string;
}

export interface SaveOrganisation {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [OrganisationData];
}

export interface OrganisationData {
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: boolean;
  name: string;
  organizationCode: string;
}

export interface OrganisationByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: OrganisationData;
}

//// Company Interface
export interface SaveCompany {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [CompanyList];
}

export interface CompanyList {
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: boolean;
  name: string;
  companyCode: string;
  companyColor: string;
  organizationId: number;
  organizationName: string;
}

export interface CompanyByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: CompanyList;
}

//// Branch Interface
export interface SaveBranch {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [BranchList];
}

export interface brancNameById {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [getBranchNameList];
}

export interface paggination {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface getBranchNameList {
  branchId: number;
  companyBranch: string;
  companyId: number;
  branchName: string;
}

export interface BranchList {
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: boolean;
  name: string;
  organizationId: number;
  organizationName: string;
  companyIds: string;
  companyName: string;
  branchName: string;
}

export interface BranchByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [BranchList];
}

/// Designation Interface
export interface SaveDesignation {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [DesignationList];
}

export interface DesignationList {
  branchId: number;
  branchName: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: any;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
  createdBy: number;
  createdByName: string;
  createdOn: string;
  description: string;
  id: number;
  isActive: boolean;
  isChecked: boolean;
  m_company_branch_designation_map: string;
  name: string;
  order: number;
  organizationId: number;
}

export interface DesignationByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: DesignationList;
}

/// Department
export interface SaveDepartment {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [DepartmentList];
}

export interface DepartmentList {
  branchId: number;
  branchName: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: number;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
  companyId: number;
  companyName: string;
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: boolean;
  m_company_branch_department_map: string;
  name: string;
  organizationId: number;
}

export interface DepartmentByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: DepartmentList;
}

//Grace Time

export interface SaveGraceTime {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [GraceTimeList];
}

export interface GraceTimeList {
  branchId: number;
  branchName: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: number;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
  companyId: number;
  companyName: string;
  createdBy: number;
  createdByName: string;
  createdOn: string;
  graceTime: number;
  id: number;
  isActive: boolean;
  m_company_branch_att_policy_map: string;
  message: string;
  msgId: number;
  name: string;
  organizationId: number;
  policyType: string;
  punchStatus: string;
  rules: string;
}

export interface GraceTimeByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: GraceTimeList;
}

// Shift

export interface SaveShift {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: ShiftList[];
}

export interface ShiftList {
  createdByName: string;
  companyId: number;
  companyName: string;
  shiftsAttPolicyList: [];
  doubleShiftName: string;
  id: number;
  name: string;
  fromTime: string;
  toTime: string;
  allowedDuration: string;
  allowedDurationHd: string;
  weekOff: string;
  weekOffDay: string;
  oT_Status: string;
  oT_fromTime: string;
  oT_ToTime: string;
  remark: string;
  organizationId: number;
  m_shifts_att_policy_map: [];
  weekOffELCount: string;
  doubleDutyApplied: string;
  shiftId: string;
  holidayApplied: string;
  holidayELCount: string;
  sandwich: string;
  holidaySandwich: string;
  applicableDate: string;
  otMinHoursApplied: string;
  otMinHours: string;
  isActive: boolean;
  createdBy: number;
  createdOn: string;
  doubleShiftIds: string;
  firstDutyOffAndMarkOTByMobile: string;
  markOTBySelfSupervisor: string;
}

export interface ShiftByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: ShiftList;
}

// Zone
export interface SaveZone {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [ZoneList];
}

export interface ZoneList {
  branchId: number;
  branchName: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: number;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
  companyId: number;
  companyName: string;
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: boolean;
  m_company_branch_zone_map: string;
  name: string;
  organizationId: number;
}

export interface ZoneByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: ZoneList;
}
//Asset Type
export interface SaveAssetType {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [AssetListType];
}

export interface AssetListType {
  createdByName: string;
  companyNames: string;
  branchId: string;
  id: number;
  name: string;
  organizationId: number;
  description: string;
  companyId: string;
  createdBy: number;
  createdOn: string;
  isActive: boolean;
  order: number;
  branchNames: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: number;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
}

export interface GetAssetById {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: AssetListType;
}

//asset
export interface SaveAsset {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [AssetList];
}

export interface AssetList {
  assetTypeId: number;
  assetTypeName: string;
  branchId: number;
  branchName: string;
  companyBranchList: [
    {
      branchList: [
        {
          branchId: number;
          branchName: string;
        }
      ];
      companyId: number;
      companyName: string;
    }
  ];
  companyId: number;
  companyName: string;
  createdBy: number;
  createdByName: string;
  createdOn: string;
  id: number;
  isActive: true;
  m_company_branch_asset_map: string;
  name: string;
  organizationId: number;
}

export interface AssetByID {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: AssetList;
}

//salaryformula
export interface SaveSalary {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: SaveSalaryList[];
}

export interface GetSalaryFormulaById {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [
    {
      createdBy: number;
      createdByName: string;
      createdOn: string;
      formulaId: number;
      formulaName: string;
      maxCap: number;
      percentage: number;
      reference: string;
      subHeadingId: number;
      subHeadingName: string;
      deductionFrom: string;
    }
  ];
}

export interface SaveSalaryList {
  isExpand: boolean;
  formulaId: number;
  subHeadingId: number;
  formulaName: string;
  subHeadingName: string;
  maxCap: number;
  percentage: number;
  reference: string;
  createdByName: string;
  createdOn: string;
  subHeadingList: [
    {
      formulaId: number;
      subHeadingId: number;
      formulaName: string;
      subHeadingName: string;
      maxCap: number;
      percentage: number;
      reference: string;
      createdByName: string;
      createdOn: string;
      createdBy: number;
    }
  ];
}
export interface SalaryFormulaDeductionList {
  success: boolean;
  status: string;
  message: string;
  data: DeductionList[];
}

export interface DeductionList {
  isExpand: boolean;
  formulaId: number;
  subHeadingId: number;
  formulaName: string;
  subHeadingName: string;
  maxCap: number;
  percentage: number;
  reference: string;
  createdByName: string;
  createdOn: string;
  createdBy: number;
  referenceName: string;
  deductionFrom: string;
  deductionList: [
    {
      formulaId: number;
      subHeadingId: number;
      formulaName: string;
      subHeadingName: string;
      maxCap: number;
      percentage: number;
      reference: string;
      createdByName: string;
      createdOn: string;
      deductionFrom: string;
      createdBy: number;
    }
  ];
}

//loan advance
export interface SaveloanAdvance {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: string;
}
export interface loanAdvancePagge {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: string;
  recordsTotal: number;
  recordsFiltered: number;
}

export interface latePenalty {
  success: boolean;
  status: string;
  message: string;
  data: latePenaltyList[];
}

export interface latePenalyPaggi {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: latePenaltyList[];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface latePenaltyList {
  formulaId: number;
  formulaName: string;
  id: number;
  graceTime: number;
  maximumLateCount: number;
  action: string;
  halfDayApplied: string;
  halfDayAppliedOnCmptWH: string;
  createdByName: string;
  createdOn: string;
  isActive: true;
  createdBy: number;
  messageConfigId: number;
  messageConfigName: string;
  configurations: [
    {
      formulaId: number;
      formulaName: string;
      id: number;
      graceTime: number;
      maximumLateCount: number;
      action: string;
      halfDayApplied: string;
      halfDayAppliedOnCmptWH: string;
      createdByName: string;
      createdOn: string;
      isActive: true;
      createdBy: number;
      configurations: [];
    }
  ];
}

export interface MessageConfig {
  success: boolean;
  status: string;
  message: string;
}

export interface insertUpdateMessageConfig extends MessageConfig {
  data: MessageConfigList[];
}

export interface MessageConfigList {
  srNo: number;
  id: number;
  createdByName: string;
  name: string;
  msgId: string;
  message: string;
  organizationId: number;
  companyId: number;
  isActive: boolean;
  createdBy: number;
  createdOn: string;
}

export interface MessageConfigByID extends MessageConfig {
  data: MessageConfigList;
}

export interface MessageConfigPaggination extends MessageConfig {
  data: MessageConfigList[];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface DeleteMessageConfig extends MessageConfig {
  data: number;
}

export interface insertUpdateBank extends MessageConfig {
  data: string;
}
export interface getCompanyBankById extends MessageConfig {
  data: [];
}
export interface getCompanyBankPaggination extends MessageConfig {
  data: ConmpanyBankList[];
  recordsTotal: number;
  recordsFiltered: number;
}
export interface ConmpanyBankList {
  companyName: string;
  createdByName: string;
  id: number;
  companyId: number;
  accountNumber: string;
  bankName: string;
  bankIFSC: string;
  bankBranch: string;
  isActive: boolean;
  createdBy: number;
  createdOn: string;
}

export interface InsertUpdateEmailConfig extends MessageConfig {
  data: EmailConfigList[];
}

export interface EmailConfigList {
  srNo: number;
  id: number;
  createdByName: string;
  organizationId: number;
  companyId: number;
  name: string;
  isActive: boolean;
  createdBy: number;
  createdOn: string;
  messageName: string;
  emailId: string;
  emailAppPassword: string;
  emailSubject: string;
  emailContent: string;
  emailSentOn: string;
  emailSentCondition: string;
}

export interface EmailConfigByID extends MessageConfig {
  data: EmailConfigList;
}

export interface EmailConfigPaggination extends MessageConfig {
  data: EmailConfigList[];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface DeleteEmailConfig extends MessageConfig {
  data: number;
}

export interface insertUpdateEmpAdditionalPolicy extends MessageConfig {
  data: string;
}

export interface getEmpAdditionalPolicy extends MessageConfig {
  data: getEmpAdditionalPolicyList;
}

export interface getEmpAdditionalPolicyList {
  id: number;
  createdByName: string;
  createdOn: string;
  lastUpdatedByName: string;
  lastUpdated: string;
  employeeId: number;
  isGeoFencing: string;
  isAlertPolicy: string;
  isShiftTimingRestrictions: string;
  geoFencingDetails: [];
  alertDetails: [];
}
