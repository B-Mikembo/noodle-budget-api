import { Injectable } from '@nestjs/common';
import { UserAccountRepository } from './ports/userAccount.repository';

export interface UserInput {
  email: string;
  password: string;
}

@Injectable()
export class SignInUsecase {
  constructor(private readonly userAccountRepository: UserAccountRepository) {}

  async execute(userAccountToCreateInput: UserInput): Promise<void> {
    Promise.resolve(userAccountToCreateInput);
  }
}
