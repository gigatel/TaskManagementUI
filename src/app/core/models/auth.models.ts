// export class User {
//   id?: number;
//   username?: string;
//   password?: string;
//   firstName?: string;
//   lastName?: string;
//   token?: string;
//   email?: string;
// }

export interface login{
  success: boolean,
  status: number,
  code: string,
  message: string,
  token: string,
  loginUserInfo: {
    userId: number,
    userName: string,
    userFullName: string,
    userEmailId: string,
    phoneNumber: string,
    designaionId: number,
    designaionName: string,
    departmentId: number,
    departmentName: string,
    orginationId: number,
    orginationName: string,
    companyId: number,
    companyName: string,
    policies: [
      {
        policyId: number,
        policyName: string
      }
    ]
  }
}

export interface Roles{
  success: boolean,
  status: number,
  message: string,
  data: string
}

export interface PasswordEncryption{
    success: boolean,
    status: number,
    message: string,
    data: {
      id: number,
      empName: string,
      employeeCode: string
    },
    key: string
}

export interface User{
  success: boolean,
  status: number,
  message: string,
  data: string,
}
