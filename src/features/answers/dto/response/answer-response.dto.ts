import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionResponseDTO } from 'src/features/questions/dto/question-response.dto';
import { QuestionEntity } from 'src/features/questions/entities/question.entity';
import { UserResponseDto } from 'src/features/users/dto/response/user-response.dto';
import { UserEntity } from 'src/features/users/entities/user.entity';

export class AnswerResponseDTO {
  @ApiProperty({ description: 'id of newly inserted answer' })
  id: number;
  @ApiProperty({ description: 'content of inserted answer' })
  content: string;
  @ApiProperty({ type: UserResponseDto })
  author: UserEntity;
  @ApiProperty({ type: CreateQuestionResponseDTO })
  question: QuestionEntity;
}
