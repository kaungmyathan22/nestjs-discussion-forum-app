import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/features/questions/entities/question.entity';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { AnswerEntity } from '../entities/answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}
  async create(
    question: QuestionEntity,
    { content }: CreateAnswerDto,
    author: UserEntity,
  ) {
    let answerInstance = this.answerRepository.create({
      content,
      author,
      question,
    });
    answerInstance = await this.answerRepository.save(answerInstance);
    return answerInstance;
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
