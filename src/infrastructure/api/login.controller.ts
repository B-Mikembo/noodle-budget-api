import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUsecase } from '../../usecase/login.usecase';
import { ApplicationError } from '../applicationError';
import { GenericController } from './genericController';
import { LoggedUserAPI } from './types/user/loggedUserAPI';
import { LoginUserAPI } from './types/user/loginUserAPI';

@Controller()
@ApiBearerAuth()
@ApiTags('1 - Users - Log in')
export class LoginController extends GenericController {
  constructor(private readonly loginUsecase: LoginUsecase) {
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
  @ApiOkResponse({ type: LoggedUserAPI })
  @ApiBadRequestResponse({ type: ApplicationError })
  async loginUser(@Body() body: LoginUserAPI): Promise<LoggedUserAPI> {
    const loggedUser = await this.loginUsecase.loginUser(
      body.email,
      body.password,
    );
    return LoggedUserAPI.mapToAPI(loggedUser.token, loggedUser.user);
  }
}
