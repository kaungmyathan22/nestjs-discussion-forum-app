import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { UsersService } from 'src/features/users/users.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtVerifyEmailStrategy extends PassportStrategy(
  Strategy,
  'jwt-email-verification',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const emailVerificationToken =
          ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        return emailVerificationToken;
      },
      secretOrKey: configService.get(
        EnvironmentConstants.EMAIL_VERIFICATION_TOKEN_SECRET,
      ),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const verificationToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const isTokenValid = await this.tokenService.isEmailVerificationTokenValid(
      payload.id,
      verificationToken,
    );
    if (isTokenValid) {
      return await this.userService.findOne(payload.id);
    }
  }
}
