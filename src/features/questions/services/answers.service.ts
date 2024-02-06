import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';
import { QuestionEntity } from 'src/features/questions/entities/question.entity';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { CreateAnswerDto } from '../dto/answer/create-answer.dto';
import { UpdateAnswerDto } from '../dto/answer/update-answer.dto';
import { AnswerEntity } from '../entities/answer.entity';
import { AnswerRepository } from '../repositories/answer.repository';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: AnswerRepository,
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

  findAll(queryParams: PaginatedParamsDto) {
    return this.answerRepository.findAllWithPaginated(queryParams);
  }

  async update(id: number, { content }: UpdateAnswerDto, user: UserEntity) {
    const answer = await this.answerRepository.findOne({
      where: { id, author: { id: user.id } },
    });
    if (!answer) {
      throw new NotFoundException('Answer not found.');
    }
    answer.content = content;
    await this.answerRepository.save(answer);
    return {
      message: 'Successfully updated the answer.',
    };
  }

  async remove(id: number, user: UserEntity) {
    const result = await this.answerRepository.delete({
      id,
      author: { id: user.id },
    });
    if (result.affected < 1) {
      throw new NotFoundException('answer with given id not found.');
    }
    return { message: 'Successfully deleted ansewwr.' };
  }

  answersByUser(queryParams: PaginatedParamsDto, user: UserEntity) {
    return this.answerRepository.findAllWithPaginated(queryParams, {
      author: { id: user.id },
    });
  }

  answersByQuestion(queryParams: PaginatedParamsDto, question: QuestionEntity) {
    return this.answerRepository.findAllWithPaginated(queryParams, {
      question: { id: question.id },
    });
  }
}
