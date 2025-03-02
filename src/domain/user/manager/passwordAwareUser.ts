export type PasswordAwareUser = {
  id: string;
  passwordHash: string;
  passwordSalt: string;
};
