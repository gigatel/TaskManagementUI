export interface TaskManagement {
  success: boolean;
  status: number;
  message: string;
}

export interface insertUpdateTaskSchedules extends TaskManagement {
  data: any;
}

export interface getTaskSchedulePaggi extends TaskManagement {
  data: taskList[];
  recordsFiltered: number;
  recordsTota: number;
}

export interface getTaskScheduleById extends TaskManagement {
  data: taskList;
}

export interface deleteTaskSchedule extends TaskManagement {
  data: any;
}

export interface taskList {
  cteatedByName: string;
  createdOn: string;
  lastUpdatedByName: string;
  lastUpdatedOn: string;
  id: number;
  taskName: string;
  scheduleType: string;
  schedule: string;
  scheduleDay: string;
  scheduleDate: string;
  scheduleTime: string;
  taskSubject: string;
  taskDescription: string;
  receiverEmailId: string;
  sNo: number;
  endDate: string;
}

export interface getTaskScheduledEmpDD extends TaskManagement {
  data: [
    {
      id: number;
      empName: string;
      employeeCode: string;
      departmentName: string;
      designationName: string;
    }
  ];
}

// src/app/core/models/task-management.models.ts

export interface ScheduleFilterInput {
  emailIds:string;
  empIds: string;
  scheduleType: string;
  status: string;
  page: number;
  size: number;
  search: string;
}

export interface TaskEmailHistory {
  sNo: number
  id: number;
  messageName: string;
  emailSubject: string;
  emailContent: string;
  emailSentOn: Date;
  emailSentCondition: string;
  sentTime: Date;
  createdBy: number;
  createdByName: string;
  createdOn: Date;
  isActive: boolean;
}

export interface TaskHistoryResponse {
  recordsTotal: number;
  recordsFiltered: number;
  success: boolean;
  status: number;
  message: string;
  data: TaskEmailHistory[];
}
export interface GetDistinctEmailsForDD extends TaskManagement {
  data: GetDistinctEmailsDetail []
}

export interface GetDistinctEmailsDetail{
  email: string
}



