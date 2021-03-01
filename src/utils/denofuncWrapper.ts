'use strict';

import { OutputChannel } from 'vscode';
import { ExecOptions } from 'child_process';
import { spawnAsync } from './spawn';

export async function execInitProject(options: ExecOptions, channel?: OutputChannel) {
  return await spawnAsync('denofunc init', options, channel);
}

export async function execDeploy(appName: string, options: ExecOptions, channel?: OutputChannel) {
  return await execDeploySlot(appName, null, options, channel);
}

export async function execDeploySlot(appName: string, slotName: string | null, options: ExecOptions, channel?: OutputChannel) {
  return await spawnAsync(`denofunc publish ${appName}${slotName ? ` --slot ${slotName}` : ''}`, options, channel);
}
