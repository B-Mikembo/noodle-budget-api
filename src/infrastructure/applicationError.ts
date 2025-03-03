import { ApiProperty } from '@nestjs/swagger';

export class ApplicationError {
  @ApiProperty()
  code: string;
  @ApiProperty()
  message: string;
  http_status: number;

  private constructor(code: string, message: string, http_status?: number) {
    this.code = code;
    this.message = message;
    this.http_status = http_status ? http_status : 400;
  }

  static throwPasswordCharSpe() {
    this.throwAppError(
      '017',
      'Le mot de passe doit contenir au moins un caractère spécial',
    );
  }

  static throwPassword12Chars() {
    this.throwAppError(
      '018',
      'Le mot de passe doit contenir au moins 12 caractères',
    );
  }

  static throwPasswordOneDigit() {
    this.throwAppError(
      '019',
      'Le mot de passe doit contenir au moins un chiffre',
    );
  }

  static throwBadEmailFormatError(email) {
    this.throwAppError(
      '020',
      `Format de l'adresse électronique ${email} incorrect`,
    );
  }

  static throwPasswordOneLowerCase() {
    this.throwAppError(
      '041',
      'Le mot de passe doit contenir au moins une minuscule',
    );
  }

  static throwPasswordOneUpperCase() {
    this.throwAppError(
      '041',
      'Le mot de passe doit contenir au moins une majuscule',
    );
  }

  private static throwAppError(
    code: string,
    message: string,
    http_status?: number,
  ) {
    throw new ApplicationError(code, message, http_status);
  }
}
