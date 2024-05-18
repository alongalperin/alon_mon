import * as path from 'path';
import * as fs from 'fs';

export const generatePaths = (name: string) => {
  return {
    absoluteDir: path.resolve(`./repos/${name}`),
    absoluteGitDir: path.resolve(`./repos/${name}/git`),
  };
};

export const createFoldersForGit = (name: string) => {
  const { absoluteDir, absoluteGitDir } = generatePaths(name);

  console.log({ absoluteDir, absoluteGitDir });

  fs.mkdirSync(absoluteDir, { recursive: true });
  fs.mkdirSync(absoluteGitDir, { recursive: true });
};

export const createFile = (filePath, fileContents) => {
  fs.writeFileSync(filePath, fileContents, 'utf8');
};
