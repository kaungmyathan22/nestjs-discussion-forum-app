import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArticlesModule } from '../articles/articles.module';
import { UsersModule } from '../users/users.module';
import { AnswersController } from './controllers/answers.controller';
import { QuestionController } from './controllers/question.controller';
import { AnswerEntity } from './entities/answer.entity';
import { QuestionEntity } from './entities/question.entity';
import { customAnswerEntityRepositoryMethods } from './repositories/answer.repository';
import { customQuestionEntityRepositoryMethods } from './repositories/question.repository';
import { AnswersService } from './services/answers.service';
import { QuestionService } from './services/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerEntity]),
    ArticlesModule,
    UsersModule,
  ],
  controllers: [QuestionController, AnswersController],
  providers: [
    QuestionService,
    {
      provide: getRepositoryToken(QuestionEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(QuestionEntity)
          .extend(customQuestionEntityRepositoryMethods);
      },
    },
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
})
export class QuestionModule {}
