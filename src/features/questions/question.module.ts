import { Module } from '@nestjs/common';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
