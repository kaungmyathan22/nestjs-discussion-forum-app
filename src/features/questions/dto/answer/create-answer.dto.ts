import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Answer content for the question',
    example: 'just use place-content: center to center a div.',
  })
  @IsString()
  content: string;
}
