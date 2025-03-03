import { Module } from '@nestjs/common';
import { PasswordManager } from './domain/user/manager/passwordManager';
import { SignupController } from './infrastructure/api/signup.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { UserRepository } from './infrastructure/repository/user/user.repository';
import { SignupUsecase } from './usecase/signup.usecase';

function getControllers(): any[] {
  const controllers = [];
  controllers.push(SignupController);
  return controllers;
}

@Module({
  imports: [],
  controllers: getControllers(),
  providers: [PrismaService, UserRepository, SignupUsecase, PasswordManager],
})
export class AppModule {}
