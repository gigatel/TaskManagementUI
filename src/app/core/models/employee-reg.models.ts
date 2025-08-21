//Employee Regs
export interface SaveEmployee {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [employeeData];
}

export interface Manager {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [];
}

export interface GetEmpVByDptDesignationsDd {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [];
}
export interface LeaveConfiq {
  success: boolean,
  status: 0,
  message: string,
  data: []
}

export interface GetEmployee {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: employeeData
}
export interface EmployeePaggi {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: employeeData[],
  recordsTotal: number,
  recordsFiltered: number
}
export interface employeeData {
  birthDate: string,
  bloodGroup: string
  branchId: number
  branchName: string
  companyBranchList: string
  companyId: number
  companyName: string,
  createdBy: number
  createdByName: string
  createdOn: string
  departmentId: number
  departmentName: string
  designationId: number
  designationName: string
  employeeCode: string
  employeePhoto: string
  employeePhotoUrl: string
  employmentType: string
  firstName: string
  gender: string
  id: number
  isActive: boolean
  isDeleted: boolean
  joiningDate: string
  lastName: string
  lastUpdated: string
  lastUpdatedBy: number
  lastUpdatedByName: string
  leavingDate: string
  middleName: string
  officeEmailId: string
  officeMobileNo: number
  organizationId: number
  personalEmailId: string
  personalMobileNo: number
  physicalStatus: string
  probationFromDate: string
  probationToDate: string
  reportingBranch: string
  reportingManager: string
  shiftId: number
  shiftName: string
  shiftTime: string
  zoneId: number
  zoneName: string,
  userId: number,
}
export interface SaveContact {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveContactListByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: {};
}

export interface SaveFamliy {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveFamliyByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: {};
}

export interface SaveDocument {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveDocumentByID {
  success: boolean,
  status: string,
  message: string,
  data: documentList;
}

export interface SaveBankDetails {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveBankDetailsByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: {};
}

export interface SaveQualification {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveQualificationByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: {};
}

export interface SaveAssetDetails {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: string;
}

export interface SaveAssetDetailsByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [];
}

export interface getAssetById {
   success: boolean,
  status: string,
  code: string,
  message: string,
  data: any;
}
export interface GetgstDetails {
  success: boolean,
  status: string,
  message: string,
  data: {
    captcha: string
    session_id: string
  }
}

export interface verifyAdhar {
  data: {
    address: {
      careOf: string
      country: string
      district: string
      house: string
      landmark: string
      locality: string
      pin: string
      postOffice: string
      state: string
      street: string
      subDistrict: string
      vtc: string
    }
    dateOfBirth: string
    email: string
    gender: string
    generatedAt: string
    maskedNumber: string
    name: string
    phone: string
    photo: string
  }
  message: "Success"
  status: 200
  success: true
}

export interface AdharOtp {
  success: boolean,
  status: number,
  message: string,
  data: {
    code: number,
    timestamp: number,
    transaction_id: string,
    message: string
  }
}

export interface EmpSaveSalary {
  success: boolean,
  status: string,
  message: string,
  data: EmpSaveSalaryList[]
}

export interface EmpSaveSalaryList {
  anualCtc: number
  anualGross: number
  createdBy: number
  createdOn: string
  employeeId: number
  id: number
  isActive: true
  isDeleted: boolean
  lastUpdated: string
  lastUpdatedBy: string
  monthlyCtc: number
  monthlyGross: number
  salaryFormulaId: number
  fromDate: string
  toDate: string
  createdByName: string
}

export interface SaveEmpSalaryByID {
  success: boolean,
  status: number,
  message: string,
  data: EmpSaveSalaryList
}

export interface documentList {
  resumeFileUrl: string,
  drivingLicenseFileUrl: string,
  panFileNameUrl: string,
  aadharFileNameUrl: string,
  esicFileNameUrl: string,
  otherFileNameUrl: string,
  id: number,
  employeeId: number,
  aadharNo: string,
  panNo: string,
  esicNo: number,
  pfAcountNo: string,
  uanNo: string,
  drivingLicense: string,
  passportNo: string,
  resumeFileName: string,
  drivingLicenseFileName: string,
  panFileName: string,
  aadharFileName: string,
  esicFileName: string,
  otherFileName: string,
  lastUpdated: string,
  lastUpdatedBy: number,
  isDeleted: boolean,
  isActive: boolean,
  createdBy: number,
  createdOn: string
}

export interface getReturnEmpAsset {
  success: boolean,
  status: number,
  message: string,
  data: any
}
