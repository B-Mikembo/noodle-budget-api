import { Injectable } from '@nestjs/common';
import { PasswordManager } from 'src/domain/user/manager/passwordManager';
import { User } from '../domain/user/user';
import { CreateUserAPI } from '../infrastructure/api/types/user/onboarding/createUserAPI';
import { UserRepository } from '../infrastructure/repository/user/user.repository';

@Injectable()
export class SignupUsecase {
  constructor(private userRepository: UserRepository) {}

  async signupUser(userInput: CreateUserAPI) {

    PasswordManager.checkPasswordFormat(userInput.password);
    User.checkEmailFormat(userInput.email);

    const userToCreate = User.createNewUser(userInput.email);
    userToCreate.setPassword(userInput.password);
    
    await this.userRepository.createUser(userToCreate);
  }
}
