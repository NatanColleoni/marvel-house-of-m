import { ApiProperty } from '@nestjs/swagger';

export class IComicsUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  variantDescription: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  description: string;
}
