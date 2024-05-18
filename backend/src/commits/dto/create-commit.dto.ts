import { IsString } from 'class-validator';

export class CreateCommitDto {
  @IsString()
  repo: string;

  @IsString()
  branch: string;

  @IsString()
  fileName: string;

  @IsString()
  fileContents: string;

  @IsString()
  commitMessage: string;
}
