import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueConstants } from 'src/common/constants/queue.constants';
import { EmailModule } from 'src/features/email/email.module';
import { UsersModule } from 'src/features/users/users.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { EmailVerificationTokenEntity } from './entities/email-verification-token.entity';
import { PasswordResetTokenEntity } from './entities/password-reset-token.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AuthEmailProcessor } from './processor/email.processor';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from './services/cookie.service';
import { TokenService } from './services/token.service';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { JwtVerifyEmailStrategy } from './strategies/jwt-verify-email.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    EmailModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
    TypeOrmModule.forFeature([
      RefreshTokenEntity,
      PasswordResetTokenEntity,
      EmailVerificationTokenEntity,
    ]),
    BullModule.registerQueue({
      name: QueueConstants.emailQueue,
    }),
    BullBoardModule.forFeature({
      name: QueueConstants.emailQueue,
      adapter: BullAdapter,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    JwtVerifyEmailStrategy,
    TokenService,
    CookieService,
    AuthEmailProcessor,
  ],
})
export class AuthenticationModule {}
