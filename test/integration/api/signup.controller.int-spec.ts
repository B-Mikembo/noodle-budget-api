import { TestUtil } from '../../TestUtil';

describe('/users - Sign up - (API test)', () => {
  const OLD_ENV = process.env;

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

    expect(response.status).toBe(201);
  });
});
