import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { ApplicationError } from '../../infrastructure/applicationError';
import { PasswordManager } from './manager/passwordManager';

export class User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  created_at: Date;
  updated_at?: Date;
  passwordHash: string;
  passwordSalt: string;

  constructor(data?: User) {
    if (data) {
      Object.assign(this, data);
    }
  }

  public static createNewUser(firstName: string, email: string): User {
    return new User({
      lastName: null,
      firstName: firstName,
      email: email,
      id: uuidv4(),
      passwordHash: null,
      passwordSalt: null,
      created_at: undefined,
    });
  }

  public setPassword?(password: string) {
    PasswordManager.setUserPassword(this, password);
  }

  public static checkEmailFormat(email: string) {
    if (!validator.isEmail(email)) {
      ApplicationError.throwBadEmailFormatError(email);
    }
  }
}
