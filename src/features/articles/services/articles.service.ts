import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { TagEntity } from '../entities/tags.entity';
import { ArticleSearchService } from './article-search.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    private readonly articleSearchService: ArticleSearchService,
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

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
