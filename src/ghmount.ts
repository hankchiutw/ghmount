import { injectProp } from '@app/di';
import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { injectable } from 'inversify';
import { bold, underline } from 'kleur';
import ora from 'ora';
import {
  Params,
  ParamsContext,
  PROMPT_CONFIGS,
  paramArgs,
  paramFlags,
} from './params';
import { StageRunner, Stage } from './stage';

@injectable()
export class Ghmount extends Command {
  static description = 'Mount github repo in filesystem';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    ...paramFlags,
  };

  static args = [...paramArgs];

  @injectProp(ParamsContext)
  private context!: ParamsContext;

  @injectProp(StageRunner)
  private stageRunner!: StageRunner;

  spinner = ora({ indent: 2 });

  async run(): Promise<void> {
    await this.initContext();
    this.configStageRunner();

    this.log('');

    await this.stageRunner.runAll();

    this.log('');
    this.log(bold(underline('Quickstart')));
    this.log('');
  }

  async initContext(): Promise<void> {
    const params = await this.getParams();
    Object.assign(this.context, params);
  }

  /**
   * Collect all the required information from args, flags, or prompt
   */
  async getParams(): Promise<Params> {
    const {
      args: { repoPath, mntPath },
    } = this.parse(Ghmount);

    const params: Params = {
      repoPath,
      mntPath,
    };

    const promptConfigs = (Object.entries(params) as [
      keyof Params,
      inquirer.QuestionCollection,
    ][])
      .filter(([, v]) => !v)
      .map(([k]) => PROMPT_CONFIGS[k]);

    const safeParams = await inquirer.prompt(promptConfigs);

    return {
      ...params,
      ...safeParams,
    };
  }

  configStageRunner(): void {
    this.stageRunner.beforeEach = (stage: Stage) => {
      this.spinner.text = stage.label;
    };

    this.stageRunner.afterEach = () => {
      this.spinner.succeed();
    };
  }
}
