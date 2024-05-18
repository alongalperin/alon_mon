import { simpleGit, SimpleGit } from 'simple-git';
import { NotFoundException } from '@nestjs/common';

import { generatePaths } from './files-utils';

export const createSimpleGitInstance = async (
  repo: string,
): Promise<SimpleGit> => {
  const { absoluteDir } = generatePaths(repo);
  let git: SimpleGit;
  try {
    git = await simpleGit(absoluteDir);
  } catch (err) {
    throw new NotFoundException('Repo not found');
  }

  return git;
};
