export type TUserRole = "admin" | "user";
export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: TUserRole
  isBlocked?: boolean;
}
