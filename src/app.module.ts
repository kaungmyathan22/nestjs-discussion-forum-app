import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import * as joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CookieMiddleware } from './common/middlewares/cookie.middleware';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './features//users/users.module';
import { ArticlesModule } from './features/articles/articles.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { EmailModule } from './features/email/email.module';
import { QuestionModule } from './features/questions/question.module';
import { SearchModule } from './features/search/search.module';
import { VotesModule } from './features/votes/votes.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        POSTGRES_USER: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
        PORT: joi.string().required(),
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.string().required(),
        SYNCHONRIZE: joi.boolean().required(),
        JWT_SECRET: joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRES_IN: joi.number().required(),
        JWT_REFRESH_SECRET: joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRES_IN: joi.number().required(),
        REDIS_HOST: joi.string().required(),
        USER_TOKEN_CACHE_KEY: joi.string().required(),
        COOKIE_JWT_ACCESS_TOKEN_KEY: joi.string().required(),
        COOKIE_REFRESH_JWT_KEY: joi.string().required(),
        REDIS_PORT: joi.number().required(),
        ELASTICSEARCH_NODE: joi.string().required(),
        ELASTICSEARCH_USERNAME: joi.string().required(),
        ELASTICSEARCH_PASSWORD: joi.string().required(),
      }),
    }),
    UsersModule,
    AuthenticationModule,
    DatabaseModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        };
      },
    }),
    EmailModule,
    QueueModule,
    QuestionModule,
    SearchModule,
    ArticlesModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes('*');
  }
}
