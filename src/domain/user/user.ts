import { v4 as uuidv4 } from 'uuid';

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

  public static createNewUser(email: string): User {
    return new User({
      lastName: null,
      firstName: null,
      email: email,
      id: uuidv4(),
      passwordHash: null,
      passwordSalt: null,
      created_at: undefined,
    });
  }
}
