import { ApiProperty } from '@nestjs/swagger';

export class IHeroeUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  description: string;
}
