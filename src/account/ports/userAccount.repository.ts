export interface UserAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserAccountToCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserAccountRepository {
  signUpUser(userAccountToCreate: UserAccountToCreate): Promise<void>;
}
