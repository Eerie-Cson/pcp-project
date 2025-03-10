import { getJestProjectsAsync } from '@nx/jest';

export default {
  projects: getJestProjectsAsync(),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
