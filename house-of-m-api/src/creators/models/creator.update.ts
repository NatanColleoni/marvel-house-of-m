import { ApiProperty } from '@nestjs/swagger';

export class ICreatorUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: string;
}
