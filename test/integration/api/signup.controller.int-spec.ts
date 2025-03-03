import { UserRepository } from '../../../src/infrastructure/repository/user/user.repository';
import { DB, TestUtil } from '../../TestUtil';

describe('/users - Sign up - (API test)', () => {
  const OLD_ENV = process.env;
  const userRepository = new UserRepository(TestUtil.prisma);

  beforeAll(async () => {
    await TestUtil.appinit();
  });

  beforeEach(async () => {
    process.env = { ...OLD_ENV };
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    process.env = OLD_ENV;
    await TestUtil.appclose();
  });

  it('POST /users - create new user with only email and password', async () => {
    const response = await TestUtil.getServer().post('/users').send({
      email: 'w@w.com',
      password: '#1234567890HAHAa',
    });

    const user = await userRepository.findByEmail('w@w.com');

    expect(response.status).toBe(201);
    expect(user.lastName).toBeNull();
    expect(user.firstName).toBeNull();
    expect(user.email).toEqual('w@w.com');
    expect(user.passwordHash.length).toBeGreaterThan(20);
    expect(user.passwordSalt.length).toBeGreaterThan(20);
  });

  it('POST /users - bad password', async () => {
    const response = await TestUtil.getServer().post('/users').send({
      email: 'w@w.com',
      password: 'to use',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Le mot de passe doit contenir au moins un chiffre',
    );
  });

  it('POST /users - throw error when email already exists', async () => {
    await TestUtil.create(DB.user, { email: 'w@w.com' });

    const response = await TestUtil.getServer().post('/users').send({
      email: 'w@w.com',
      password: '#1234567890HAHAa',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      'Adresse électronique w@w.com déjà existante',
    );
  });

  it('POST /users - email missing', async () => {
    const response = await TestUtil.getServer().post('/users').send({
      password: '#1234567890HAHAa',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      'Adresse électronique obligatoire pour créer un utilisateur',
    );
  });

  it('POST /users - bad email format', async () => {
    const response = await TestUtil.getServer().post('/users').send({
      email: 'truc.com',
      password: '#1234567890HAHAa',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      `Format de l'adresse électronique truc.com incorrect`,
    );
  });
});
