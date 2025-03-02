import { Injectable } from '@nestjs/common';
import { Prisma, User as UserDB } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../domain/user/user';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(user: User) {
    try {
      await this.prisma.user.create({
        data: this.buildNewDBUserFromUser(user),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.error(error);
        }
      }
    }
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
