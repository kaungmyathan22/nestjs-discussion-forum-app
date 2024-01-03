import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get(EnvironmentConstants.ELASTICSEARCH_NODE),
        auth: {
          username: configService.get(
            EnvironmentConstants.ELASTICSEARCH_USERNAME,
          ),
          password: configService.get(
            EnvironmentConstants.ELASTICSEARCH_PASSWORD,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [SearchModule],
})
export class SearchModule {}
