import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/repository/user/user.repository';
import { User } from '../domain/user/user';

@Injectable()
export class LoginUsecase {
  constructor(private userRepository: UserRepository) {}

  async loginUser(email: string, password: string): Promise<{token: string; user: User} {
    const user = await this.userRepository.findByEmail(email);
    
  }
}
