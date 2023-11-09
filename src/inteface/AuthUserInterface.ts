interface AuthAttributes {
  id: number;
  username?: string | null;
  email?: string | null;
  roleId?: number | null;
  verified?: boolean | null;
  token?: string | null;
  active?: boolean | null;
  menuAccess?: Array<any>;
}

export default AuthAttributes;
