import { IsString } from 'class-validator';

export class DeleteBranchDto {
  @IsString()
  repo: string;

  @IsString()
  branch: string;
}
