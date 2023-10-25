import { RoleObj } from "./role.interface";

export interface UserObj {
  userId?: number;
  email?: string;
  fullName?: string;
  nickName?: string;
  phoneNumber?: string;
  deactivate?: boolean;
  lsRoles?: RoleObj[];
  token?: string;
}
