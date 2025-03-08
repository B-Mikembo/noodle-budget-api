import { Injectable } from '@nestjs/common';
import { PasswordManager } from '../domain/user/manager/passwordManager';
import { UserRepository } from '../infrastructure/repository/user/user.repository';

@Injectable()
export class LoginUsecase {
  constructor(
    private userRepository: UserRepository,
    private passwodManager: PasswordManager,
  ) {}

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    await this.passwodManager.loginUser(user, password);
  }
}
