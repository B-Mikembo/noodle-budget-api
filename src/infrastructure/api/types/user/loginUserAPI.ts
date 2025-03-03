import { ApiProperty } from '@nestjs/swagger';

export class LoginUserAPI {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
