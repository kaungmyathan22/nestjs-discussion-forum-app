import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArticlesModule } from '../articles/articles.module';
import { UsersModule } from '../users/users.module';
import { QuestionController } from './controllers/question.controller';
import { QuestionEntity } from './entities/question.entity';
import { customQuestionEntityRepositoryMethods } from './repositories/question.repository';
import { QuestionService } from './services/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity]),
    ArticlesModule,
    UsersModule,
  ],
  controllers: [QuestionController],
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
  ],
})
export class QuestionModule {}
