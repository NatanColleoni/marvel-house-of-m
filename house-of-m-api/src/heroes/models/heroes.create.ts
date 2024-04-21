import { ApiProperty } from '@nestjs/swagger';

export class IHeroeCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  description: string;
}
