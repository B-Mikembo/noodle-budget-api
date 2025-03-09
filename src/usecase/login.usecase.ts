import { Injectable } from '@nestjs/common';
import { PasswordManager } from '../domain/user/manager/passwordManager';
import { User } from '../domain/user/user';
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
    const user = await this.userRepository.findByEmail(email);
    console.log(user);
    await this.passwodManager.loginUser(user, password);
    const token = await this.tokenRepository.createNewAppToken(user.id);
    return { token: token, user: user };
  }
}
