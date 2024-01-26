import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsArray()
  @IsString({
    each: true,
    message: 'Each element of the tags should be a string',
  })
  @ArrayNotEmpty({ message: 'tags should not be empty' })
  @ArrayMinSize(1, { message: 'tags should have at least one element' })
  tags: string[];
}
