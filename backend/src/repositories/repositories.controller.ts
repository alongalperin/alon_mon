import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Post()
  create(@Body() createRepositoryDto: CreateRepositoryDto) {
    return this.repositoriesService.create(createRepositoryDto);
  }

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repositoriesService.findOne(+id);
  }

  @Patch(':name')
  update(
    @Param('name') oldName: string,
    @Body() updateRepositoryDto: UpdateRepositoryDto,
  ) {
    return this.repositoriesService.update(oldName, updateRepositoryDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.repositoriesService.remove(name);
  }
}
