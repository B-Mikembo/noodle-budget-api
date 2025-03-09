import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../domain/user/user';

export class UserAPI {
  @ApiProperty()
  id: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  email?: string;

  public static mapToAPI(user: User): UserAPI {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
    };
  }
}
