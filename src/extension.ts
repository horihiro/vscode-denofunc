'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, workspace, window} from 'vscode';
import { platform } from 'os';

// Commands
import { initProject } from './commands/initProject';
import { deploy, deploySlot } from './commands/deploy';
import { createFunction } from './commands/createFunction';
import { addBinding } from './commands/addBinding';

// Utils
import { spawnAsync } from './utils/spawn';

const whereOrWhich = platform() === 'win32' ? 'where' : 'which';

export async function activate(context:ExtensionContext) {
  let command = workspace.getConfiguration('denofunc')?.path || 'denofunc';
  try {
    await spawnAsync(`${whereOrWhich} ${command}`);
    command = 'az';
    await spawnAsync(`${whereOrWhich} ${command}`);
  } catch {
    window.showErrorMessage(`DenoFunc: Cannot find command \`${command}\`.`, );
    return;
  }

  context.subscriptions.push(commands.registerCommand('DenoFunc.createFunction', createFunction));
  context.subscriptions.push(commands.registerCommand('DenoFunc.initProject', initProject));
  context.subscriptions.push(commands.registerCommand('DenoFunc.deploy', deploy));
  context.subscriptions.push(commands.registerCommand('DenoFunc.deploySlot', deploySlot));
  context.subscriptions.push(commands.registerCommand('DenoFunc.addBinding', addBinding));
}

// this method is called when your extension is deactivated
export function deactivate() { }
