import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from 'src/features/articles/services/tags.service';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionEntityRepository } from '../repositories/question.repository';
import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: QuestionEntityRepository,
    private readonly tagService: TagService,
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

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });
    if (!question) {
      throw new NotFoundException('Question not found with given id.');
    }
    return question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
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
}
