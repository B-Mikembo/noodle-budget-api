import { PasswordManager } from '../../../../../src/domain/user/manager/passwordManager';
import { User } from '../../../../../src/domain/user/user';

describe('PasswordManager Object', () => {
  it('setUserPassword : hash and salt password', () => {
    let user = new User();
    PasswordManager.setUserPassword(user, 'toto');

    expect(user.passwordHash.length).toBeGreaterThan(10);
    expect(user.passwordSalt.length).toBeGreaterThan(10);
  });
});
