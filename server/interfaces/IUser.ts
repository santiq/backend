export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  lastLogin?: Date;
  role?: string;
}