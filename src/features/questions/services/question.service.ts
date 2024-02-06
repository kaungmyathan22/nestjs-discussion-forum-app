import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';
import { TagService } from 'src/features/articles/services/tags.service';
import { CreateAnswerDto } from 'src/features/questions/dto/answer/create-answer.dto';
import { AnswersService } from 'src/features/questions/services/answers.service';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { UsersService } from 'src/features/users/users.service';
import { FindOptionsWhere } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionEntityRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: QuestionEntityRepository,
    private readonly tagService: TagService,
    private readonly userService: UsersService,
    private readonly answersService: AnswersService,
  ) {}
  async create(payload: CreateQuestionDto, user: UserEntity) {
    const { title, content, tags } = payload;
    let newQuestion = this.questionRepository.create({
      title,
      content,
      author: user,
    });
    newQuestion = await this.questionRepository.save(newQuestion);
    const _tags = await Promise.all(
      tags.map((tag) => this.tagService.getOrCreate(tag)),
    );
    newQuestion.tags = _tags;
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }

  findAll(queryParams: PaginatedParamsDto) {
    return this.questionRepository.findAllWithPaginated(queryParams);
  }

  async findOneOrFail(where: FindOptionsWhere<QuestionEntity>) {
    const question = await this.questionRepository.findOne({
      where,
      relations: ['tags', 'author'],
    });
    if (!question) {
      throw new NotFoundException('Question not found with given id.');
    }
    return question;
  }

  async findOne(id: number) {
    const question = await this.findOneOrFail({ id });
    return question;
  }

  async update(id: number, payload: UpdateQuestionDto, user: UserEntity) {
    const question = await this.findOneOrFail({ id, author: { id: user.id } });
    const { tags, ...rest } = payload;
    if (Object.entries(payload).length === 0) {
      throw new BadRequestException(
        'Please specify at leat one field to upated',
      );
    }
    await this.questionRepository.update({ id: id }, rest);
    if (tags) {
      const _tags = await Promise.all(
        tags.map(async (tag) => this.tagService.getOrCreate(tag)),
      );
      question.tags = _tags;
      await this.questionRepository.save(question);
    }
    return {
      message: 'Successfully updated the article.',
    };
  }

  async remove(id: number, user: UserEntity) {
    const result = await this.questionRepository.delete({
      id,
      author: { id: user.id },
    });
    if (result.affected < 1) {
      throw new NotFoundException('Question with given id not found.');
    }
    return { message: 'Successfully deleted question.' };
  }

  async byTag(params: PaginatedParamsDto, tagId: number) {
    const [result] = await Promise.all([
      this.questionRepository.findAllWithPaginated(params, {
        tags: [{ id: tagId }],
      }),
      this.tagService.findOneOrFail({ id: tagId }),
    ]);
    return result;
  }

  async byUser(params: PaginatedParamsDto, userId: number) {
    const [result] = await Promise.all([
      this.questionRepository.findAllWithPaginated(params, {
        author: {
          id: userId,
        },
      }),
      this.userService.findOneOrFail({ id: userId }),
    ]);
    return result;
  }

  async answerAQuestion(
    id: number,
    payload: CreateAnswerDto,
    user: UserEntity,
  ) {
    const question = await this.findOneOrFail({ id });
    return this.answersService.create(question, payload, user);
  }

  async answersByQuestion(queryParams: PaginatedParamsDto, id: number) {
    const question = await this.findOneOrFail({ id });
    return this.answersService.answersByQuestion(queryParams, question);
  }
}
