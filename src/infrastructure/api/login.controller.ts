import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationError } from '../applicationError';
import { GenericController } from './genericController';
import { LoggedUserAPI } from './types/user/loggedUserAPI';
import { LoginUserAPI } from './types/user/loginUserAPI';

@Controller()
@ApiBearerAuth()
@ApiTags('1 - Users - Log in')
export class LoginController extends GenericController {
  constructor() {
    super();
  }
  @Post('users/login')
  @ApiOperation({
    summary:
      'log in operation from existing user, return user informations with JWT token',
  })
  @ApiBody({
    type: LoginUserAPI,
  })
  @ApiBadRequestResponse({ type: ApplicationError })
  async loginUser(@Body() body: LoginUserAPI): Promise<LoggedUserAPI> {
    console.log('prout');
    return LoggedUserAPI.mapToAPI('', null);
  }
}
