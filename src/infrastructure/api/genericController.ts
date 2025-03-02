import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { UserRepository } from '../repository/user/user.repository';
import { ControllerExceptionFilter } from './controllerException.filter';

@UseFilters(new ControllerExceptionFilter())
@Injectable()
export class GenericController {
  @Inject()
  private userRepository: UserRepository;
}
