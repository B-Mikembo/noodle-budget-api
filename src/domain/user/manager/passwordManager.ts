import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { PasswordAwareUser } from './passwordAwareUser';

@Injectable()
export class PasswordManager {
  constructor() {}

  public static setUserPassword(user: PasswordAwareUser, password: string) {
    user.passwordSalt = crypto.randomBytes(16).toString('hex');
    user.passwordHash = crypto
      .pbkdf2Sync(password, user.passwordSalt, 1000, 64, 'sha512')
      .toString('hex');
  }
}
