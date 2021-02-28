'use strict';

import * as vscode from 'vscode';

export async function getTargetFolder(options: vscode.QuickPickOptions):Promise<vscode.QuickPickItem | undefined> {
  if (!vscode.workspace.workspaceFolders) return undefined;
  if (vscode.workspace.workspaceFolders.length === 1) return { label: vscode.workspace.workspaceFolders[0].name, description: vscode.workspace.workspaceFolders[0].uri.fsPath };
  return await vscode.window.showQuickPick(
    vscode.workspace.workspaceFolders.map(wf => ({
      label: wf.name,
      description: wf.uri.fsPath
    })
    ), options);
}
