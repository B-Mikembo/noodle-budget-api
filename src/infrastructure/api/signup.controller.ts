import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignupUsecase } from '../../usecase/signup.usecase';
import { GenericController } from './genericController';
import { CreateUserAPI } from './types/user/onboarding/createUserAPI';
import { ProspectSubmitAPI } from './types/user/onboarding/prospectSubmitAPI';

@Controller()
@ApiTags('1 - Users - Sign up')
export class SignupController extends GenericController {
  constructor(private readonly signupUsecase: SignupUsecase) {
    super();
  }

  @Post('users')
  @ApiOperation({
    summary: 'account creation, only email and password are mandatory',
  })
  @ApiBody({
    type: CreateUserAPI,
  })
  @ApiOkResponse({
    type: ProspectSubmitAPI,
  })
  async createUser(@Body() body: CreateUserAPI) {
    await this.signupUsecase.signupUser(body);
    return {
      email: body.email,
    };
  }
}
