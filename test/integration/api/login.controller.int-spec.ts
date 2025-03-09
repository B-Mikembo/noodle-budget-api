import { PasswordManager } from '../../../src/domain/user/manager/passwordManager';
import { UserRepository } from '../../../src/infrastructure/repository/user/user.repository';
import { DB, TestUtil } from '../../TestUtil';

function getFakeUser() {
  return {
    id: null,
    passwordHash: '',
    passwordSalt: '',
  };
}

describe('/users - Log in - (API test)', () => {
  const OLD_ENV = process.env;
  const userRepository = new UserRepository(TestUtil.prisma);

  beforeAll(async () => {
    await TestUtil.appinit();
  });

  beforeEach(async () => {
    process.env = { ...OLD_ENV };
    await TestUtil.deleteAll();
    await TestUtil.generateAuthorizationToken('user-id');
  });

  afterAll(async () => {
    process.env = OLD_ENV;
    await TestUtil.appclose();
  });

  it('POST /users/login - should connect me and return my informations with JWT token when I send correct credentials', async () => {
    const user = getFakeUser();
    PasswordManager.setUserPassword(user, '#1234567890HAHAa');

    await TestUtil.create(DB.user, {
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });

    const response = await TestUtil.getServer().post('/users/login').send({
      email: 'yo@truc.com',
      password: '#1234567890HAHAa',
    });

    expect(response.status).toBe(201);
    expect(response.body.token.length).toBeGreaterThan(20);
    expect(response.body.user.id).toEqual('user-id');
    expect(response.body.user.lastName).toEqual('lastName');
    expect(response.body.user.firstName).toEqual('firstName');
  });
  it('POST /users/login - should throw an error when I send bad email', async () => {
    const user = getFakeUser();
    PasswordManager.setUserPassword(user, '#1234567890HAHAa');

    await TestUtil.create(DB.user, {
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });

    const response = await TestUtil.getServer().post('/users/login').send({
      password: '#1234567890HAHAa',
      email: 'bademail@truc.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      'Mauvaise adresse électronique ou mauvais mot de passe',
    );
  });
  it('POST /users/login - should throw an error when I send bad password', async () => {
    //  GIVEN
    const user = getFakeUser();
    PasswordManager.setUserPassword(user, '#1234567890HAHAa');

    await TestUtil.create(DB.user, {
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
    });

    //  WHEN
    const response = await TestUtil.getServer().post('/users/login').send({
      password: '#bad password',
      email: 'yo@truc.com',
    });

    //  THEN
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      'Mauvaise adresse électronique ou mauvais mot de passe',
    );
  });
});
