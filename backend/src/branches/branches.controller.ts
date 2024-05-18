import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { DeleteBranchDto } from './dto/delete-branch.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post(':repoName')
  create(
    @Param('repoName') repoName: string,
    @Body() createBranchDto: CreateBranchDto,
  ) {
    return this.branchesService.create(repoName, createBranchDto);
  }

  @Get(':repoName')
  findAll(@Param('repoName') repoName: string) {
    return this.branchesService.findAll(repoName);
  }

  @Delete()
  remove(
    @Body() deleteBranchDto: DeleteBranchDto,
  ) {
    return this.branchesService.remove(deleteBranchDto);
  }
}
