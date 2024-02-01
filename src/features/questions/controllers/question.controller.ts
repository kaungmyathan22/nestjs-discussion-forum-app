import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user';
import { PaginatedArticleResponseDto } from 'src/common/dto/response/paginated-response.dto';
import JwtAuthenticationGuard from 'src/features/authentication/guards/jwt.guard';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { CreateQuestionResponseDTO as QuestionResponseDTO } from '../dto/question-response.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionService } from '../services/question.service';

@ApiTags('Questions')
@Controller('api/v1/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Create a question' })
  @ApiResponse({
    status: 201,
    description: 'Question has been successfully created.',
    type: QuestionResponseDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 401,
    description: 'Need to login to create question.',
  })
  @HttpCode(201)
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.questionService.create(createQuestionDto, user);
  }

  @ApiOperation({ summary: 'Get a list of paginated questions.' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieve questions',
    type: PaginatedArticleResponseDto<QuestionResponseDTO>,
  })
  @Get()
  findAll(@Query() queryParams) {
    return this.questionService.findAll(queryParams);
  }

  @ApiOperation({ summary: 'Get a question' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get a question by given id.',
    type: QuestionResponseDTO,
  })
  @ApiResponse({ status: 404, description: 'Question not found with given id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @ApiResponse({ status: 404, description: 'Question not found with given id' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated question by given id.',
    type: QuestionResponseDTO,
  })
  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.questionService.update(+id, updateQuestionDto, user);
  }

  @ApiOperation({ summary: 'Delete a question by id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Content deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Question not found with given id' })
  @ApiResponse({
    status: 401,
    description: 'Need to login to delete question.',
  })
  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.questionService.remove(+id, user);
  }
}
