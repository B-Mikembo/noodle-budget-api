import { Injectable } from '@nestjs/common';
import { PasswordManager } from '../domain/user/manager/passwordManager';
import { User } from '../domain/user/user';
import { ApplicationError } from '../infrastructure/applicationError';
import { TokenRepository } from '../infrastructure/repository/token.repository';
import { UserRepository } from '../infrastructure/repository/user/user.repository';

@Injectable()
export class LoginUsecase {
  constructor(
    private userRepository: UserRepository,
    private passwodManager: PasswordManager,
    private tokenRepository: TokenRepository,
  ) {}

  public async loginUser(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }> {
    if (!email || email === '') {
      ApplicationError.throwMissingEmail();
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      ApplicationError.throwBadPasswordOrEmailError();
    }
    console.log(user);
    await this.passwodManager.loginUser(user, password);
    const token = await this.tokenRepository.createNewAppToken(user.id);
    return { token: token, user: user };
  }
}
