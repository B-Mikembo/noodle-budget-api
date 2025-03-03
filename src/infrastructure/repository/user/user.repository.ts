import { Injectable } from '@nestjs/common';
import { Prisma, User as UserDB } from '@prisma/client';
import { ApplicationError } from 'src/infrastructure/applicationError';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../domain/user/user';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.prisma.user.findMany({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
    if (users.length !== 1) {
      return null;
    }
    return this.buildUserFromDB(users[0]);
  }

  async createUser(user: User) {
    try {
      await this.prisma.user.create({
        data: this.buildNewDBUserFromUser(user),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          ApplicationError.throwEmailAlreadyExistError(user.email);
        }
      }
    }
  }

  private buildUserFromDB(user: Partial<UserDB>): User {
    if (!user) {
      return null;
    }
    const result = new User({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
    return result;
  }

  private buildNewDBUserFromUser(user: User): UserDB {
    return {
      ...this.buildDBUserCoreDataFromUser(user),
    };
  }

  private buildDBUserCoreDataFromUser(user: User): UserDB {
    return {
      id: user.id ? user.id : uuidv4(),
      lastName: user.lastName,
      firstName: user.firstName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      email: user.email,
      created_at: undefined,
      updated_at: undefined,
    };
  }
}
