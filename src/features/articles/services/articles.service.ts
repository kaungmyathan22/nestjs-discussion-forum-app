import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleEntityRepository } from '../repositories/article.repository';
import { TagService } from './tags.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleEntityRepository,
    private readonly tagService: TagService,
  ) {}
  async create(user: UserEntity, payload: CreateArticleDto) {
    const { title, content, tags } = payload;
    let newArticle = this.articleRepository.create({
      title,
      content,
      author: user,
    });
    newArticle = await this.articleRepository.save(newArticle);
    const _tags = await Promise.all(
      tags.map((tag) => this.tagService.getOrCreate(tag)),
    );
    newArticle.tags = _tags;
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  findAll(queryParams: PaginatedParamsDto) {
    return this.articleRepository.findAllWithPaginated(queryParams);
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['tags', 'author'],
    });
    if (!article) {
      throw new NotFoundException('Aricle not found with given id.');
    }
    return article;
  }

  async update(id: number, payload: UpdateArticleDto) {
    const { tags, ...rest } = payload;
    const article = await this.findOne(id);
    await this.articleRepository.update({ id: id }, rest);
    if (tags) {
      const _tags = await Promise.all(
        tags.map(async (tag) => this.tagService.getOrCreate(tag)),
      );
      article.tags = _tags;
      await this.articleRepository.save(article);
    }
    return {
      message: 'Successfully updated the article.',
    };
  }

  async remove(id: number, user: UserEntity) {
    const result = await this.articleRepository.delete({
      id,
      author: { id: user.id },
    });
    if (result.affected < 1) {
      throw new NotFoundException('Article with given id not found.');
    }
    return { message: 'Successfully deleted article.' };
  }

  async byTag(params: PaginatedParamsDto, tagId: number) {
    return await this.articleRepository.findAllWithPaginated(params, {
      tags: [{ id: tagId }],
    });
  }
}
