'use strict';

import { OutputChannel } from 'vscode';
import { ExecOptions } from 'child_process';
import { spawnAsync } from './spawn';

export async function execAzFuncAppList (options?:ExecOptions, channel?: OutputChannel) {
  const azResourceCmd = [
    'az',
    'resource',
    'list',
    '--resource-type',
    'Microsoft.web/sites',
    '-o',
    'json',
  ];
  const { stdout } = await spawnAsync(azResourceCmd.join(' '), options);
  return JSON.parse(stdout.toString()).filter((resource:any) => resource['kind']?.includes('functionapp')).map((resource:any) => resource['name']);
}

export async function execAzFuncAppSlotList (appName: string, options?:ExecOptions, channel?: OutputChannel) {
  const azResourceCmd = [
    'az',
    'resource',
    'list',
    '--resource-type',
    'Microsoft.web/sites/slots',
    '-o',
    'json',
  ];
  const { stdout } = await spawnAsync(azResourceCmd.join(' '), options);
  return JSON.parse(stdout.toString()).filter((resource:any) => resource['kind']?.includes('functionapp') && resource['name'].split('/')[0] === appName).map((resource:any) => resource['name'].split('/')[1]);
}

