import { Injectable } from '@nestjs/common';
import { CreateUserAPI } from '../infrastructure/api/types/user/onboarding/createUserAPI';

@Injectable()
export class SignupUsecase {
  constructor() {}

  async signupUser(userInput: CreateUserAPI) {}
}
