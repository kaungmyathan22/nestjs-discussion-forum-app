import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  getDataSourceToken,
  getRepositoryToken,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SearchModule } from '../search/search.module';
import { ArticlesController } from './controllers/articles.controller';
import { ArticleEntity } from './entities/article.entity';
import { TagEntity } from './entities/tags.entity';
import { customArticleEntityRepositoryMethods } from './repositories/article.repository';
import { ArticleSearchService } from './services/article-search.service';
import { ArticlesService } from './services/articles.service';
import { TagService } from './services/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, TagEntity]), SearchModule],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    TagService,
    ArticleSearchService,
    {
      provide: getRepositoryToken(ArticleEntity),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(ArticleEntity)
          .extend(customArticleEntityRepositoryMethods);
      },
    },
  ],
})
export class ArticlesModule {}
