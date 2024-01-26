import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user';
import JwtAuthenticationGuard from '../../authentication/guards/jwt.guard';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticlesService } from '../services/articles.service';

@Controller('api/v1/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.articlesService.create(user, createArticleDto);
  }

  @Get('/tags/:tagId')
  findArticlesByTags(@Query() queryParams, @Param('tagId') tagId: number) {
    return this.articlesService.byTag(queryParams, tagId);
  }

  @Get()
  findAll(@Query() queryParams) {
    return this.articlesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.articlesService.remove(+id, user);
  }
}
