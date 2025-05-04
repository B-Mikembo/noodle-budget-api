import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAPI {
  @ApiProperty({ required: true })
  firstName: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
}
