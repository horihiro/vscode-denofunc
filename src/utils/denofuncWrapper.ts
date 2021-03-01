'use strict';

import { OutputChannel, workspace } from 'vscode';
import { ExecOptions } from 'child_process';
import { spawnAsync } from './spawn';


export async function execInitProject(options: ExecOptions, channel?: OutputChannel) {
  const pathToDenoFunc = workspace.getConfiguration('denofunc')?.path || 'denofunc';
  return await spawnAsync(`${pathToDenoFunc} init`, options, channel);
}

export async function execDeploy(appName: string, options: ExecOptions, channel?: OutputChannel) {
  return await execDeploySlot(appName, null, options, channel);
}

export async function execDeploySlot(appName: string, slotName: string | null, options: ExecOptions, channel?: OutputChannel) {
  const pathToDenoFunc = workspace.getConfiguration('denofunc')?.path || 'denofunc';
  return await spawnAsync(`${pathToDenoFunc} publish ${appName}${slotName ? ` --slot ${slotName}` : ''}`, options, channel);
}
