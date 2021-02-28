'use strict';

import * as child_process from 'child_process';
import * as util from 'util';
import { channel } from '../util/outputChannel';
import { platform } from 'os';

const isWindows = platform() === 'win32';
const spawnAsync = (cmd: string, options: child_process.ExecOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const p = child_process.spawn(cmd, isWindows ? Object.assign(options, {shell: true}) : options);
    let stdoutData = '';
    let stderrData = '';
    p.on('exit', (code: number) => {
      if (code === 0) {
        resolve({ stdout: stdoutData, stderr: stderrData });
        return
      }
      reject({ stdout: stdoutData, stderr: stderrData, error: code });
    });
    p.stdout.setEncoding('utf-8');
    p.stdout.on('data', (data) => {
      const d = data.toString()
      channel.append(d);
      stdoutData += d;
    });
    p.stderr.on('data', (data) => {
      const d = data.toString()
      channel.append(d);
      stderrData += d;
    });
  })
};

export async function execInitProject(options: child_process.ExecOptions) {
  return await spawnAsync('denofunc init', options);
}

export async function execDeploy(appName: string, options: child_process.ExecOptions) {
  return await execDeploySlot(appName, null, options);
}

export async function execDeploySlot(appName: string, slotName: string | null, options: child_process.ExecOptions) {
  return await spawnAsync(`denofunc publish ${appName}${slotName ? ` --slot ${slotName}` : ''}`, options);
}
