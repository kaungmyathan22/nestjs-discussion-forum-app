import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtEmailVerificationGuard extends AuthGuard(
  'jwt-email-verification',
) {}
