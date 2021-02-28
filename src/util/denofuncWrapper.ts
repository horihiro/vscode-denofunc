'use strict';

import * as child_process from 'child_process';
import * as util from 'util';
import { channel } from '../util/outputChannel';
import { platform } from 'os';

const execAsync = util.promisify(child_process.exec);
const spawnAsync = (cmd: string, options: child_process.ExecOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (platform() === 'win32') {
      Object.assign(options, {shell: true});
    }
    const p = child_process.spawn(cmd, options);
    let stdoutData = '';
    let stderrData = '';
    p.on('exit', (code: number) => {
      if (code === 0) {
        resolve({ stdout: stdoutData });
        return
      }
      reject(stderrData);
    });
    p.stdout.setEncoding('utf-8');
    p.stdout.on('data', (data) => {
      channel.appendLine(data.toString());
      stdoutData += data.toString();
    });
    p.stderr.on('data', (data) => {
      channel.appendLine(data.toString());
      stderrData += data.toString();
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
  return await execAsync(`denofunc publish ${appName}${slotName ? ` --slot ${slotName}` : ''}`, options);
}

export async function execCreateFunction() {

}