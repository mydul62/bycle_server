export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  photo?: string;

}
