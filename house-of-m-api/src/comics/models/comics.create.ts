import { ApiProperty } from '@nestjs/swagger';

export class IComicsCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  variantDescription: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  description: string;
}
