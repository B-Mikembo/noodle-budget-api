import { PasswordManager } from '../../../../../src/domain/user/manager/passwordManager';
import { User } from '../../../../../src/domain/user/user';

const passwordManager = new PasswordManager();

describe('PasswordManager Object', () => {
  it('checkPasswordFormat : contains at least one digit', () => {
    try {
      PasswordManager.checkPasswordFormat('pasdechiffre');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Le mot de passe doit contenir au moins un chiffre',
      );
    }
  });
  it('checkPasswordFormat : contains at least one lower case', () => {
    try {
      PasswordManager.checkPasswordFormat('A123456789012#');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Le mot de passe doit contenir au moins une minuscule',
      );
    }
  });
  it('checkPasswordFormat : contains at least one upper case', () => {
    try {
      PasswordManager.checkPasswordFormat('a123456789012#');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Le mot de passe doit contenir au moins une majuscule',
      );
    }
  });
  it('checkPasswordFormat : is short password', () => {
    try {
      PasswordManager.checkPasswordFormat('Tooshort1');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Le mot de passe doit contenir au moins 12 caractères',
      );
    }
  });
  it('checkPasswordFormat : special character', () => {
    try {
      PasswordManager.checkPasswordFormat('There is no special character1');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Le mot de passe doit contenir au moins un caractère spécial',
      );
    }
  });
  it('setUserPassword : hash and salt password', () => {
    const user = new User();
    PasswordManager.setUserPassword(user, 'toto');

    expect(user.passwordHash.length).toBeGreaterThan(10);
    expect(user.passwordSalt.length).toBeGreaterThan(10);
  });
  it('checkPassword : OK and returns true', async () => {
    let user = new User();
    PasswordManager.setUserPassword(user, 'toto');

    try {
      await passwordManager.loginUser(user, 'toto');
    } catch (error) {
      console.error(error);
      fail();
    }
  });
  it('should throw an error when I send incorrect password', async () => {
    let user = new User();
    PasswordManager.setUserPassword(user, 'toto');

    try {
      await passwordManager.loginUser(user, 'titi');
      fail();
    } catch (error) {
      expect(error.message).toEqual(
        'Mauvaise adresse électronique ou mauvais mot de passe',
      );
    }
  });
});
