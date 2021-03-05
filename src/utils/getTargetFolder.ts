'use strict';

import { window, workspace, QuickPickItem, QuickPickOptions } from 'vscode';

export async function getTargetFolder(options: QuickPickOptions): Promise<QuickPickItem | undefined> {
  if (!workspace.workspaceFolders) return undefined;
  if (workspace.workspaceFolders.length === 1) {
    const wf = workspace.workspaceFolders[0];
    return { label: wf.name, description: wf.uri.fsPath.replace(new RegExp(wf.name), '') };
  }
  return await window.showQuickPick(
    workspace.workspaceFolders.map(wf => ({
      label: wf.name,
      description: wf.uri.fsPath.replace(new RegExp(wf.name), '')
    })
    ), options);
}
