import { IsString } from 'class-validator';

export class UpdateRepositoryDto {
  @IsString()
  name: string;
}
