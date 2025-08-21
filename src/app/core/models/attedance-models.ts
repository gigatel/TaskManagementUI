export interface ShiftAttPolicyVM {
  id: number;
  attPolicyId: number;
  graceTime: number;
  rules: string | null;
  message: string | null;
  msgId: number | null;
  policyType: string | null;
  punchStatus: string | null;
  name: string;
  allowedDuration: number | null;
  allowedDurationHd: number | null;
  shiftId: number;
  fromTime: string;
  toTime: string;
  doubleShiftIds: string | null;
  createdByName:  string | null;
  companyId: number;
  companyName:  string | null;
  shiftsAttPolicyList: [];
  doubleShiftName:  string | null;
  weekOff:  string | null;
  weekOffDay:  string | null;
  oT_Status:  string | null;
  oT_fromTime:  string | null;
  oT_ToTime:  string | null;
  remark:  string | null;
  organizationId: number;
  m_shifts_att_policy_map:  string | null;
  weekOffELCount:  string | null;
  doubleDutyApplied:  string | null;
  holidayApplied:  string | null;
  holidayELCount:  string | null;
  sandwich:  string | null;
  holidaySandwich:  string | null;
  applicableDate:  string | null;
  otMinHoursApplied:  string | null;
  otMinHours:  string | null;
  isActive: boolean | null;
  createdBy: number | null;
  createdOn:  string | null;
}
export interface AttendanceInOutData {
  date: string;
  _date: Date;
  inTime: string;
  outTime: string;
  inFullTime: Date | null;
  outFullTime: Date | null;
  late: string;
  workingHours: string | null;
  status: string | null;
  overTime: string;
  inMode: string | null;
  outMode: string | null;
  inLocation: string | null;
  outLocation: string | null;
  remark: string | null;
  editByName: string | null;
  editOn: string | null;
  statusAuto: boolean | null;
  shiftAttPolicies: ShiftAttPolicyVM[] | null;
  doubleDuty: AttendanceInOutData;
  tripleDuty: AttendanceInOutData;
  isEdited: boolean | null;
  joiningDate: string | null;
  leavingDate: string | null;
  weekOffDay: string | null;
  isLocked: boolean | null;
  isApproved: false;
  otInApplicableOTRange: string | null;
  bhaf1StatusAuto: boolean | null;
  bhaf2StatusAuto: boolean | null;
  latePanaltyData: [
    {
      lateDaysCount: number;
      isLatePanaltyApplied: boolean | null;
      latePenaltyId: number;
      latePenaltyName: string | null;
      action: string | null;
      maximumLateCount: number;
    }
  ];
}

export interface AttendanceInOutFullData extends AttendanceInOutData {
  empId: number;
  empName: string;
  departmentId: number;
  departmentName: string;
  designationId: number;
  designationName: string;
  shiftId: number;
  shiftName: string;
  device: string;
  doubleDuty: AttendanceInOutFullData;
  tripleDuty: AttendanceInOutFullData;
}
export interface EmployeeInfo {
  id: number;
  employeeCode: string | null;
  firstName: string;
  empName: string;
  middleName: string | null;
  lastName: string | null;
  designationId: number;
  designationName: string | null;
  departmentId: number;
  departmentName: string | null;
  shiftId: number;
  shiftTime: string | null;
  shiftName: string | null;
  employeePhoto: string | null;
  employeePhotoUrl: string | null;
}
export interface EmpsLeaveVM {
  id: number;
  empId: number;
  leaveTypeId: number;
  dayTypeId: number;
  dayTypeName: string | null;
  halfName: string | null;
  half: number | null;
  fromTime: string | null;
  toTime: string | null;
  fromDate: string;
  toDate: string;
  isApproved: boolean | null;
  approvedBy: number | null;
  approvedOn: string | null;
  shortName: string;
}
export interface EmpAttendance {
  srNo: number;
  emp: EmployeeInfo;
  leaves: EmpsLeaveVM[];
  holidays: EmpHolidayRequestVM[];
  attendanceInOutList: AttendanceInOutFullData[];
}

export interface EmpHolidayRequestVM {
  id: number;
  empName: string;
  employeeCode: string;
  designationName: string | null;
  departmentName: string | null;
  empId: number;
  holidayId: number;
  name: string;
  holidayDate: string;
  isApproved: boolean;
  approvedByName: string;
  createdByName: string;
  createdOn: string;
}

export interface HolidayVM {
  id: number;
  name: string;
  holidayDate: string;
  isOptional: boolean;
  organizationId: number | null;
  companyId: number | null;
  createdByName: string;
}
export interface BaseDailyAttendenceRes {
  success: boolean;
  status: number;
  message: string;
  recordsFiltered: number;
  recordsTotal: number;
  holidays: HolidayVM[];
  allShiftAttPolicies: ShiftAttPolicyVM[];
  data: EmpAttendance[];
}

export interface EmployeeDd {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: [];
}
export interface BaseRes {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: any;
}
export interface LockApproveStatus {
  isApproved: boolean;
  isLocked: boolean;
}
export interface LockApproveStatusRes {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: LockApproveStatus;
}
export interface EmpPunchLogsVM {
  srNo: number;
  id: number;
  employeeId: number;
  employeeName: string | null;
  employeeCode: string | null;
  departmentName: string | null;
  designationName: string | null;
  deviceName: string | null;
  location: string | null;
  punchMode: string | null;
  createdOn: string | null;
  shiftTime: string | null;
}
export interface EmpPunchLogsByDateRangeDateRangeRes {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: EmpPunchLogsVM[];
  recordsTotal: number;
  recordsFiltered: number;
}
export interface EmployeeLeaveTyepDd {
  id: string | null;
  name: string;
  shortName: string | null;
}
export interface EmployeeLeaveTyepRes {
  success: boolean;
  status: string;
  code: string;
  message: string;
  data: EmployeeLeaveTyepDd[];
}

export interface EmpAttendece {
  success: boolean;
  status: string;
  message: string;
  data: [];
}

export interface AttendenceLog {
  success: boolean;
  status: number;
  message: string;
  data: [
    {
      attendanceDate: string;
      empName: string;
      editBy: string;
      previousStatus: string;
      newStatus: string;
      previousDD: string;
      newDD: string;
      previousOT: string;
      newOT: string;
      previousInOuttime: string;
      newInOuttime: string;
      previousWH: string;
      newWH: string;
    }
  ];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface EditAttendanceEmpDD {
  success: boolean;
  status: number;
  message: string;
  data: [];
}
