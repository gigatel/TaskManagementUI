export interface SaveLeaveType {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [LeaveListType]
}

export interface LeaveListType {
  createdByName: string,
  companyNames: string,
  branchId: string,
  id: number,
  name: string,
  shortName: string
  organizationId: number,
  description: string,
  companyId: string,
  createdBy: number,
  createdOn: string,
  isActive: boolean,
  order: number,

}

export interface GetLeaveById {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: LeaveListType
}

//Leave
export interface SaveLeave {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [LeaveList]

}

export interface LeaveList {
  LeaveTypeId: number
  LeaveTypeName: string
  companyId: number
  companyName: string
  createdBy: number
  createdByName: string
  createdOn: string
  id: number
  isActive: true
  name: string
  shortName: string
  organizationId: number
}

export interface LeaveByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: LeaveList
}

export interface LeaveConfiguration {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [LeaveConfigurationList]
}

export interface LeaveConfigurationList {
  applicableForm: string
  carryForwardMonth: string
  createdBy: number
  createdByName: string
  createdOn: string
  employeeType: number
  encash: boolean
  encashmentMonth: string
  id: number
  isActive: true
  leaveTypeId: number
  leaveTypeName: string
  leaveTypeShortName: string
  maximumEncash: number
  monthlyAdjustment: boolean
  totalCarryForwardLeave: number
  totalLeavePerDay: number
  totalLeavePerMonth: number
  totalLeavePerYear: number
  yearlyCarryForward: boolean
  employeeTypeName: string,
  formulaName: string,
  leaveConfigurations: [],
  formulaId: number,
  sandwich: boolean,
}

export interface LeaveConfigurationByID {
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: LeaveConfigurationList[]
}

export interface LeaveRequest{
  success: boolean,
  status: string,
  message: string,
  data:[]
}

export interface LeaveRequestPaggi{
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: [],
  recordsTotal: number,
  recordsFiltered: number,
}

export interface LeaverequestById{
  success: boolean,
  status: string,
  code: string,
  message: string,
  data: leaverequestList
}
export interface leaverequestList{
  approvedBy : any
  approvedByName : string
  approvedOn: any
  createdBy: number
  createdByName:  string
  createdOn: string
  dayTypeId: number
  dayTypeName: string
  departmentName: string
  designationName: string
  docName: string
  docUrl : any
  empId:  number
  fromDate:string
  toDate:string
  empName: string
  employeeCode : string
  fromTime:  any
  half: number
  halfName: string
  id: number
  isActive: boolean
  isApproved : boolean
  leaveDate :  any
  leaveTypeId: number
  remark : string
  toTime :  any
}
