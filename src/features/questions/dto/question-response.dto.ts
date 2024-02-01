import { ApiProperty } from '@nestjs/swagger';
import { TagResponseDto } from 'src/features/articles/dto/response/tags-response';
import { UserResponseDto } from 'src/features/users/dto/response/user-response.dto';

export class CreateQuestionResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ type: UserResponseDto })
  author: UserResponseDto;

  @ApiProperty({ type: TagResponseDto, isArray: true })
  tags: TagResponseDto[];
}
