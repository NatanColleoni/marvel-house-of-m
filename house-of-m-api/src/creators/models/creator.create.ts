import { ApiProperty } from '@nestjs/swagger';

export class ICreatorCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: string;
}
