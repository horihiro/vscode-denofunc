'use strict';

import { OutputChannel } from 'vscode';
import { spawn, ExecOptions } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';
export const spawnAsync = (cmd: string, options?: ExecOptions, channel?: OutputChannel): Promise<any> => {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, isWindows ? Object.assign(options || {}, { shell: true }) : options);
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
      channel && channel.append(d);
      stdoutData += d;
    });
    p.stderr.on('data', (data) => {
      const d = data.toString()
      channel && channel.append(d);
      stderrData += d;
    });
  })
};

