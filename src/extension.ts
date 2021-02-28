'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Commands
import { initProject } from './commands/initProject';
import { deploy, deploySlot } from './commands/deploy';
import { createFunction } from './commands/createFunction';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('DenoFunc.createFunction', createFunction));
  context.subscriptions.push(vscode.commands.registerCommand('DenoFunc.initProject', initProject));
  context.subscriptions.push(vscode.commands.registerCommand('DenoFunc.deploy', deploy));
  context.subscriptions.push(vscode.commands.registerCommand('DenoFunc.deploySlot', deploySlot));
}

// this method is called when your extension is deactivated
export function deactivate() { }
