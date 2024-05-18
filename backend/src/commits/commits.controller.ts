import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCommitDto } from './dto/update-commit.dto';

@Controller('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Post()
  create(@Body() createCommitDto: CreateCommitDto) {
    return this.commitsService.create(createCommitDto);
  }

  // TODO: use DTO for params, if can
  @Get()
  findAll(@Query('repo') repo: string, @Query('branch') branch: string) {
    return this.commitsService.findAll(repo, branch);
  }
}
