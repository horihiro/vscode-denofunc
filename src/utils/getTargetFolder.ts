'use strict';

import { window, workspace, QuickPickItem, QuickPickOptions} from 'vscode';

export async function getTargetFolder(options: QuickPickOptions):Promise<QuickPickItem | undefined> {
  if (!workspace.workspaceFolders) return undefined;
  if (workspace.workspaceFolders.length === 1) return { label: workspace.workspaceFolders[0].name, description: workspace.workspaceFolders[0].uri.fsPath };
  return await window.showQuickPick(
    workspace.workspaceFolders.map(wf => ({
      label: wf.name,
      description: wf.uri.fsPath
    })
    ), options);
}
