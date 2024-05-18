import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { DeleteBranchDto } from './dto/delete-branch.dto';
import { createSimpleGitInstance } from '../utils/simpleGit';

@Injectable()
export class BranchesService {
  async create(repoName: string, createBranchDto: CreateBranchDto) {
    const git = await createSimpleGitInstance(repoName);

    const { branch: branchName } = createBranchDto;
    await git.checkoutLocalBranch(branchName);

    return `Created branch ${branchName} for repo: ${repoName}`;
  }

  async findAll(repo: string) {
    const git = await createSimpleGitInstance(repo);

    const branchSummary = await git.branch(['-a']);

    return branchSummary.all;
  }

  async remove(deleteBranchDto: DeleteBranchDto) {
    const { repo, branch } = deleteBranchDto;
    const git = await createSimpleGitInstance(repo);

    await git.deleteLocalBranch(branch);

    return `Deleted branch ${branch} for repo: ${repo}`;
  }
}
