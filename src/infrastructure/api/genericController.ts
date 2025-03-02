import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user/user.repository';

@Injectable()
export class GenericController {
  @Inject()
  private userRepository: UserRepository;
}
