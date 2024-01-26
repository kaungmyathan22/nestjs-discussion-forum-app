import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedParamsDto } from 'src/common/dto/pagination.dto';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { TagEntity } from '../entities/tags.entity';
import { ArticleEntityRepository } from '../repositories/article.repository';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: ArticleEntityRepository,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async create(user: UserEntity, payload: CreateArticleDto) {
    const { title, content, tags } = payload;
    let newArticle = this.articleRepository.create({
      title,
      content,
      author: user,
    });
    newArticle = await this.articleRepository.save(newArticle);
    await Promise.all(
      tags.map(async (tag) => {
        let tagEntity = await this.tagRepository.findOne({
          where: { title: tag },
          relations: ['articles'],
        });
        if (!tagEntity) {
          tagEntity = await this.tagRepository.save(
            this.tagRepository.create({ title: tag }),
          );
          tagEntity.articles = [];
        }
        tagEntity.articles.push(newArticle);
        this.tagRepository.save(tagEntity);
        return tagEntity;
      }),
    );
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

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
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
}
