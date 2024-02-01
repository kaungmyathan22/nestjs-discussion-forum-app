import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Title of the question',
    example: 'How to center div in html.',
  })
  @IsString()
  title: string;
  @ApiProperty({
    description: 'Content of the question may be markdown or wysiwyg content.',
    example: 'Lorem ipsum. How can i center div in my html project?.',
  })
  @IsString()
  content: string;
  @ApiProperty({
    example: ['html', 'css'],
    description: 'Tags for question. Separated by comma in array.',
  })
  @IsArray()
  @IsString({
    each: true,
    message: 'Each element of the tags should be a string',
  })
  @ArrayNotEmpty({ message: 'tags should not be empty' })
  @ArrayMinSize(1, { message: 'tags should have at least one element' })
  tags: string[];
}
