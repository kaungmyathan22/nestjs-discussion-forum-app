import { BadRequestException, Injectable } from '@nestjs/common';
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

  async validate(req: Request, payload: EmailVerificationJwtPayload) {
    const verificationToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException('Invalid email verification token.');
    }
    if (user.verified) {
      throw new BadRequestException('User email is already verified.');
    }
    const isTokenValid = await this.tokenService.isEmailVerificationTokenValid(
      user.id,
      verificationToken,
    );
    if (!isTokenValid) {
      throw new BadRequestException('Invalid email verification token.');
    }

    if (isTokenValid) {
      return user;
    }
  }
}
