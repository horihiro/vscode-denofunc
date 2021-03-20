'use strict';

import { OutputChannel } from 'vscode';
import { spawn, ExecOptions } from 'child_process';

export const spawnAsync = (cmd: string, options?: ExecOptions, channel?: OutputChannel): Promise<any> => {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, Object.assign(options || {}, { shell: true, env: Object.assign({NO_COLOR: true} , process.env) }));
    let stdoutData = '';
    let stderrData = '';
    p.on('close', (code: number) => {
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

