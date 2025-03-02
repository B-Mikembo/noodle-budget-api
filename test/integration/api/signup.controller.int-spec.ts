import { UserRepository } from '../../../src/infrastructure/repository/user/user.repository';
import { TestUtil } from '../../TestUtil';

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
    expect(user).not.toBeNull();
  });
});
