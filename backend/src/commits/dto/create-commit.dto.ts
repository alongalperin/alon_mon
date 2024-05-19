import { IsString } from 'class-validator';

export class CreateCommitDto {
  @IsString()
  repo: string;

  @IsString()
  branch: string;

  @IsString()
  filename: string;

  @IsString()
  fileContents: string;

  @IsString()
  commitMessage: string;
}
