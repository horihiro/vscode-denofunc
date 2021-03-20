'use strict';

import { window, workspace, QuickPickItem, QuickPickOptions } from 'vscode';
import { promises as fsPromises, Dirent } from 'fs';

export async function pickTargetFolder(options: QuickPickOptions): Promise<QuickPickItem | undefined> {
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

export async function pickFunction(targetFolder: string, options: QuickPickOptions): Promise<QuickPickItem | undefined> {
  const dirents:Dirent[] = (await fsPromises.readdir(targetFolder, {withFileTypes: true})).filter(ent => ent.name.endsWith('.ts'));
  if (!dirents || dirents.length === 0) return;

  return await window.showQuickPick(
    dirents.map(dirent => ({
      label: dirent.name
    })), options);
}
