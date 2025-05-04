import { User } from '../../../src/domain/user/user';
import { UserRepository } from '../../../src/infrastructure/repository/user/user.repository';
import { TestUtil } from '../../TestUtil';

describe('UserRepository', () => {
  const userRepository = new UserRepository(TestUtil.prisma);

  beforeAll(async () => {
    await TestUtil.appinit();
  });

  beforeEach(async () => {
    await TestUtil.deleteAll();
  });

  afterAll(async () => {
    await TestUtil.appclose();
  });

  it('create and read', async () => {
    const user = User.createNewUser('Bob', 'w@w.com');
    user.id = 'user-id';

    await userRepository.createUser(user);

    const userDB = await TestUtil.prisma.user.findUnique({
      where: { id: 'user-id' },
    });

    expect(userDB.id).toEqual(user.id);
    expect(userDB.email).toEqual(user.email);
    expect(userDB.firstName).toEqual(user.firstName);
    expect(userDB.lastName).toEqual(user.lastName);
    expect(userDB.passwordHash).toBeNull();
    expect(userDB.passwordSalt).toBeNull();
    expect(userDB.created_at).toBeDefined();
    expect(userDB.updated_at).toBeDefined();
  });
});
