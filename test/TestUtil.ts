import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service';

export enum DB {
  user = 'user',
}

export class TestUtil {
  private static TYPE_DATA_MAP = {
    user: TestUtil.userData,
  };

  constructor() {}
  public static ok_appclose = true;
  public static app: INestApplication;
  public static prisma = new PrismaService();
  public static user = 'user';
  public static SECRET = '123456789012345678901234567890';
  public static jwtService = new JwtService({
    secret: TestUtil.SECRET,
  });
  public static token;

  static async generateAuthorizationToken(userId: string) {
    const result = await TestUtil.jwtService.signAsync({ userId });
    TestUtil.token = result;
  }

  static getServer() {
    return request(this.app.getHttpServer());
  }

  static async appinit() {
    if (TestUtil.app === undefined) {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      TestUtil.app = moduleFixture.createNestApplication();
      await TestUtil.app.init();
    }
  }

  static async appclose() {
    if (TestUtil.ok_appclose) {
      await this.app.close();
      await this.prisma.$disconnect();
    }
  }

  static async deleteAll() {
    await this.prisma.user.deleteMany();
  }

  static async create<K extends keyof typeof TestUtil.TYPE_DATA_MAP>(
    type: K,
    override?: Parameters<(typeof TestUtil.TYPE_DATA_MAP)[K]>[0],
  ) {
    await this.prisma[type as string].create({
      data: (TestUtil.TYPE_DATA_MAP[type as DB] as Function)(override),
    });
  }

  static userData(override?: Partial<User>): User {
    return {
      id: 'user-id',
      lastName: 'lastName',
      firstName: 'firstName',
      passwordHash: 'hash',
      passwordSalt: 'salt',
      email: 'yo@truc.com',
      created_at: undefined,
      updated_at: undefined,
      ...override,
    };
  }
}
