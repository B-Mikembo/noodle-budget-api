import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { ApplicationError } from '../../../infrastructure/applicationError';
import { User } from '../user';
import { PasswordAwareUser } from './passwordAwareUser';

@Injectable()
export class PasswordManager {
  constructor() {}

  public async loginUser(user: User, password: string): Promise<any> {
    const login_ok = await this.checkUserPasswordOK(user, password);
    if (!login_ok) {
      console.log(`CONNEXION : loginUser : [${user.id}] bad password`);
      ApplicationError.throwBadPasswordOrEmailError();
    }
  }

  public static checkPasswordFormat(password: string) {
    if (!this.atLeastOneDigit(password)) {
      ApplicationError.throwPasswordOneDigit();
    }
    if (!this.atLeastOneLowerCase(password)) {
      ApplicationError.throwPasswordOneLowerCase();
    }
    if (!this.atLeastOneUpperCase(password)) {
      ApplicationError.throwPasswordOneUpperCase();
    }
    if (!this.atLeast12Chars(password)) {
      ApplicationError.throwPassword12Chars();
    }
    if (!this.atLeastSpecialCharacter(password)) {
      ApplicationError.throwPasswordCharSpe();
    }
  }

  public static setUserPassword(user: PasswordAwareUser, password: string) {
    user.passwordSalt = crypto.randomBytes(16).toString('hex');
    user.passwordHash = crypto
      .pbkdf2Sync(password, user.passwordSalt, 1000, 64, 'sha512')
      .toString('hex');
  }

  private async checkUserPasswordOK(
    user: PasswordAwareUser,
    password: string,
  ): Promise<boolean> {
    let ok = false;
    if (user.passwordHash && user.passwordSalt) {
      ok =
        user.passwordHash ===
        crypto
          .pbkdf2Sync(password, user.passwordSalt, 1000, 64, `sha512`)
          .toString(`hex`);
    }
    return ok;
  }

  private static atLeastSpecialCharacter(password: string | null): boolean {
    const regexp = new RegExp(
      /([(&~»#)‘\-_`{[|`_\\^@)\]=}+%*$£¨!§/:;.?¿'"!,§éèêëàâä»])+/,
      'g',
    );
    return password ? regexp.test(password) : false;
  }

  private static atLeast12Chars(password: string | null): boolean {
    return password ? password.length >= 12 : false;
  }

  private static atLeastOneDigit(password: string | null): boolean {
    const regexp = new RegExp(/([0-9])+/, 'g');
    return password ? regexp.test(password) : false;
  }

  private static atLeastOneLowerCase(password: string | null): boolean {
    const regexp = new RegExp(/([a-z])+/, 'g');
    return password ? regexp.test(password) : false;
  }

  private static atLeastOneUpperCase(password: string | null): boolean {
    const regexp = new RegExp(/([A-Z])+/, 'g');
    return password ? regexp.test(password) : false;
  }
}
