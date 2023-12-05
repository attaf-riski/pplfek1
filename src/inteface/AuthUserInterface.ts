interface AuthAttributes {
  id: number;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  roleId?: number | null;
  verified?: boolean | null;
  token?: string | null;
  active?: boolean | null;
}

export default AuthAttributes;
