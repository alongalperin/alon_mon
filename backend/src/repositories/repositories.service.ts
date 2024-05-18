const util = require('util');
const exec = util.promisify(require('child_process').exec);
import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { simpleGit } from 'simple-git';
import { createFoldersForGit, generatePaths } from '../utils/files-utils';

import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';

async function initGitRepo(logger: Logger, name: string) {
  const { absoluteDir, absoluteGitDir } = generatePaths(name);

  try {
    const git = await simpleGit(absoluteDir);

    // Initialize the repository with a separate git directory
    await git.raw(['init', '--separate-git-dir', absoluteGitDir]);
    await git.addRemote('origin', absoluteGitDir);
    await git.addConfig('core.worktree', absoluteDir);
    await git.addConfig('core.gitdir', absoluteGitDir);
    await git.commit('first commit', [], { '--allow-empty': null });

    logger.log(
      `Initialized repository in ${absoluteDir} with .git directory in ${absoluteGitDir}`,
    );
  } catch (err) {
    logger.error(`Failed to initialize repository ${absoluteGitDir}:`, err);
    throw new InternalServerErrorException(
      `Unable to create repository: ${name}`,
    );
  }
}

@Injectable()
export class RepositoriesService {
  private readonly logger = new Logger(RepositoriesService.name);

  async create(createRepositoryDto: CreateRepositoryDto) {
    const { name } = createRepositoryDto;
    createFoldersForGit(name);
    await initGitRepo(this.logger, name);
  }

  async findAll() {
    const { stdout, stderr } = await exec('ls ./repos');
    const repos = stdout.split('\n').slice(0, -1);
    return repos;
  }

  findOne(id: number) {
    return `This action returns a #${id} repository`;
  }

  async update(oldName: string, updateRepositoryDto: UpdateRepositoryDto) {
    const { name } = updateRepositoryDto;

    this.logger.log(`Renaming from ${oldName} to ${name}`);

    this.logger.log({ oldName, name });

    await exec(`mv ./repos/${oldName} ./repos/${name}`);
    await exec(`mv ./git-store/${oldName} ./git-store/${name}`);

    return `rename from:${oldName} to: ${name}`;
  }

  async remove(name: string) {
    this.logger.log(`Deleting ${name}`);

    await exec(`rm -rf ./repos/${name}`);
    await exec(`rm -rf ./git-store/${name}`);

    return `Deleted repository ${name}`;
  }
}
