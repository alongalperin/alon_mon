import { Injectable, Logger } from '@nestjs/common';
import { CreateCommitDto } from './dto/create-commit.dto';
import { createSimpleGitInstance } from '../utils/simpleGit';
import { createFile, generatePaths } from '../utils/files-utils';

@Injectable()
export class CommitsService {
  private readonly logger = new Logger(CommitsService.name);

  async create(createCommitDto: CreateCommitDto) {
    const { repo, branch, fileName, fileContents, commitMessage } =
      createCommitDto;
    const { absoluteDir } = generatePaths(repo);
    const filePath = `${absoluteDir}/${fileName}`;

    try {
      await createFile(filePath, fileContents);
      this.logger.log(`File created: ${filePath}`);

      const git = await createSimpleGitInstance(repo);
      // Add the file to the git staging area
      await git.add(filePath);
      this.logger.log(`File added to staging: ${filePath}`);

      await git.checkout(branch);
      await git.commit(commitMessage);
      this.logger.log(`Committed with message: "${commitMessage}"`);
    } catch (error) {
      this.logger.error('Error during git operation:', error);
    }
  }

  async findAll(repo: string, branch: string) {
    this.logger.log(`Getting diff for repo: ${repo} branch: ${branch}`);
    const git = await createSimpleGitInstance(repo);
    const diff = await git.diffSummary([`main...${branch}`]);
    const files = diff.files.map((file) => file.file);
    return files;
  }
}
