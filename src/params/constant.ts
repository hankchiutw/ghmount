import type * as inquirer from 'inquirer';
import type { Params } from './interfaces';

export const PROMPT_CONFIGS: Record<
  keyof Params,
  inquirer.QuestionCollection
> = {
  repoPath: {
    name: 'repoPath',
    message: 'repo path',
    type: 'input',
    validate: (v: string) => !!v || 'can not be empty',
  },
  mntPath: {
    name: 'mntPath',
    message: 'mount path',
    type: 'input',
    validate: (v: string) => !!v || 'can not be empty',
  },
};

export const paramArgs = [{ name: 'repoPath', description: 'repo path' }, { name: 'mntPath', description: 'mount path' }];

export const paramFlags = {
};
