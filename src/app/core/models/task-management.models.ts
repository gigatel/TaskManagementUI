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
