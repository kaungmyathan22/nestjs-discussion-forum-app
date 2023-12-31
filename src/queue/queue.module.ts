import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';

@Module({
  imports: [
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get(EnvironmentConstants.REDIS_HOST),
            port: configService.get(EnvironmentConstants.REDIS_PORT),
          },
        };
      },
    }),
  ],
})
export class QueueModule {}
