import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../domain/user/user';
import { UserAPI } from './userAPI';

export class LoggedUserAPI {
  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ type: UserAPI })
  user: UserAPI;

  public static mapToAPI(token: string, user: User): LoggedUserAPI {
    return {
      token: token,
      user: UserAPI.mapToAPI(user),
    };
  }
}
