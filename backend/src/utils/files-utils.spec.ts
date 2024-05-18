import { generatePaths } from './files-utils';

describe('files-utils', () => {
  describe('generatePaths', () => {
    it('should create 2 paths', () => {
      const repo = 'test_repo';
      const paths = generatePaths(repo);

      expect(paths).toHaveProperty('absoluteDir');
      expect(paths).toHaveProperty('absoluteGitDir');
    });
  });
});
