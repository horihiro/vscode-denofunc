'use strict';

import * as child_process from 'child_process';
import * as util from 'util';
const execAsync = util.promisify(child_process.exec);

export async function execAzFuncAppList (options?:child_process.ExecOptions) {
  const azResourceCmd = [
    'az',
    'resource',
    'list',
    '--resource-type',
    'Microsoft.web/sites',
    '-o',
    'json',
  ];
  const { stdout } = await execAsync(azResourceCmd.join(' '), options);
  return JSON.parse(stdout.toString()).filter((resource:any) => resource['kind']?.includes('functionapp')).map((resource:any) => resource['name']);
}

export async function execAzFuncAppSlotList (appName: string, options?:child_process.ExecOptions) {
  const azResourceCmd = [
    'az',
    'resource',
    'list',
    '--resource-type',
    'Microsoft.web/sites/slots',
    '-o',
    'json',
  ];
  const { stdout } = await execAsync(azResourceCmd.join(' '), options);
  return JSON.parse(stdout.toString()).filter((resource:any) => resource['kind']?.includes('functionapp') && resource['name'].split('/')[0] === appName).map((resource:any) => resource['name'].split('/')[1]);
}

