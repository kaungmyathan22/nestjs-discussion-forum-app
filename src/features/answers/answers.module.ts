import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { AnswersController } from './controllers/answers.controller';
import { AnswerEntity } from './entities/answer.entity';
import { AnswersService } from './services/answers.service';
import { DataSource } from 'typeorm';
import { customAnswerEntityRepositoryMethods } from './repositories/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswersController],
  providers: [
    AnswersService,
    {
      provide: getRepositoryToken(AnswerEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(AnswerEntity)
          .extend(customAnswerEntityRepositoryMethods);
      },
    },
  ],
  exports: [AnswersService],
})
export class AnswersModule {}
