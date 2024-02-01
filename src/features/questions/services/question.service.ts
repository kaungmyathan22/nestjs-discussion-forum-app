import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagService } from 'src/features/articles/services/tags.service';
import { UserEntity } from 'src/features/users/entities/user.entity';
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

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
