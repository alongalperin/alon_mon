import { IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  branch: string;
}
