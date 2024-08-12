export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
  }
  
  export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    mobileNo?: string;
    role?: UserRole;
    status?:string;
    message?:string;
    
  
    constructor(
      username?: string,
      password?: string,
      email?: string,
      role?: UserRole,
      id?: number,
      mobileNo?: string,
      status?:string,
      message?:string
    ) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.role = role;
      this.mobileNo = mobileNo;
      this.status=status;
      this.message=message;
    }
  }
  