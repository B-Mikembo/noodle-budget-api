import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/..';

@Injectable()
export class LoginUsecase {
  constructor(private userRepository: UserRepository) {}

  async loginUser(email: string, password: stirng) {
    const user = await this.userRepository.findByEmail(email);
  }
}
