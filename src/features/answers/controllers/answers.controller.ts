import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user';
import JwtAuthenticationGuard from 'src/features/authentication/guards/jwt.guard';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { AnswersService } from '../services/answers.service';

@ApiTags('Answer')
@Controller('api/v1/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.answersService.update(+id, updateAnswerDto, user);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.answersService.remove(+id, user);
  }
}
