import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './controllers/question.controller';
import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './services/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
