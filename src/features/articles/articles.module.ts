import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from '../search/search.module';
import { ArticlesController } from './articles.controller';
import { ArticleEntity } from './entities/article.entity';
import { TagEntity } from './entities/tags.entity';
import { ArticleSearchService } from './services/article-search.service';
import { ArticlesService } from './services/articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, TagEntity]), SearchModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticleSearchService],
})
export class ArticlesModule {}
