import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Cache } from 'cache-manager';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: Repository<RefreshTokenEntity>,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async upsertRefreshToken(refresh_token: string, user: UserEntity) {
    const expirationTime = new Date();
    const tokenExpirationTimeInSecodns = +this.configService.get(
      EnvironmentConstants.JWT_REFRESH_TOKEN_EXPIRES_IN,
    );
    expirationTime.setSeconds(
      expirationTime.getSeconds() + tokenExpirationTimeInSecodns,
    );

    const refreshTokenHash = await bcrypt.hash(refresh_token, 10);
    const tokenInstance = await this.refreshTokenRepository.upsert(
      {
        user,
        refreshTokenHash,
        expirationTime,
      },
      ['user'],
    );
    return tokenInstance;
  }
  remove(user: UserEntity) {
    return this.refreshTokenRepository.delete({ user: { id: user.id } });
  }

  async isRefreshTokenValid(userId: number, token: string): Promise<boolean> {
    const currentTime = new Date();
    const tokenFromDB = await this.refreshTokenRepository.findOne({
      where: {
        user: { id: userId },
        expirationTime: MoreThanOrEqual(currentTime),
      },
    });
    return tokenFromDB && tokenFromDB.isTokenMatch(token);
  }

  async getRefreshToken(user: UserEntity) {
    const refresh_token = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get(EnvironmentConstants.JWT_REFRESH_SECRET),
        expiresIn: +this.configService.get(
          EnvironmentConstants.JWT_REFRESH_TOKEN_EXPIRES_IN,
        ),
      },
    );
    await this.upsertRefreshToken(refresh_token, user);
    return refresh_token;
  }

  getAccessToken(user: UserEntity) {
    const jwt_access_expiration_time = this.configService.get<number>(
      EnvironmentConstants.JWT_ACCESS_TOKEN_EXPIRES_IN,
    );
    const access_token = this.jwtService.sign(
      { id: user.id },
      { expiresIn: jwt_access_expiration_time },
    );
    const cacheKey = this.configService.get(
      EnvironmentConstants.USER_TOKEN_CACHE_KEY,
    );
    this.cacheService.set(`${cacheKey}:${user.id}`, access_token, {
      ttl: jwt_access_expiration_time,
    } as any);
    return access_token;
  }
}
