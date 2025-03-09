import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PasswordManager } from './domain/user/manager/passwordManager';
import { LoginController } from './infrastructure/api/logIn.controller';
import { SignupController } from './infrastructure/api/signup.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { TokenRepository } from './infrastructure/repository/token.repository';
import { UserRepository } from './infrastructure/repository/user/user.repository';
import { LoginUsecase } from './usecase/login.usecase';
import { SignupUsecase } from './usecase/signup.usecase';

const SESSION_LIFETIME = '30 days';

function getControllers(): any[] {
  const controllers = [];
  controllers.push(SignupController, LoginController);
  return controllers;
}

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.INTERNAL_TOKEN_SECRET,
      signOptions: { expiresIn: SESSION_LIFETIME },
    }),
  ],
  controllers: getControllers(),
  providers: [
    PrismaService,
    UserRepository,
    SignupUsecase,
    PasswordManager,
    LoginUsecase,
    TokenRepository,
  ],
})
export class AppModule {}
