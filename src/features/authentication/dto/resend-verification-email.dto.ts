import { IsEmail } from 'class-validator';

export class ResendVerificationEmailDTO {
  @IsEmail()
  email: string;
}
