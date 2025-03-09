import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenRepository {
  constructor(private jwtService: JwtService) {}

  public async createNewAppToken(userId: string): Promise<string> {
    return await this.jwtService.signAsync({ userId });
  }
}
