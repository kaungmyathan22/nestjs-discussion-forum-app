import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, default: null })
  bio: string;

  @ApiProperty()
  email: string;
}
