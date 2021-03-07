'use strict';

import { window, workspace, ProgressLocation, commands } from 'vscode';
import { channel } from '../utils/outputChannel';
import { getTargetFolder } from '../utils/getTargetFolder';
import { execInitProject } from '../utils/denofuncWrapper';
import { promises as fsPromises } from 'fs';

export async function initProject(folder?: string) {
  // The code you place here will be executed every time your command is executed

  let targetFolder = folder;
  if (!targetFolder) {
    if (!workspace.workspaceFolders) {
      const message = 'DenoFunc: Working folder not found, open a folder and try again';
      window.showErrorMessage(message);
      return;
    }

    const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
    if (!f) return;
    targetFolder = f.description + f.label;
  }

  await window.withProgress({
    location: ProgressLocation.Notification,
    title: 'DenoFunc - Initializing...',
    cancellable: false
  }, async () => {
    channel.show();
    channel.appendLine('Initializing...');
    return await execInitProject({
      cwd: targetFolder
    }, channel);
  });
  window.showInformationMessage(`Initialize Project: The directory \`${targetFolder}\` was initialized.`);
  if (workspace.workspaceFile) {
    // enable Deno extension in .code-workspace
    const workspaceJson = JSON.parse(await fsPromises.readFile(workspace.workspaceFile.fsPath, {encoding: 'utf-8'}));
    if (workspaceJson.settings) workspaceJson.settings['deno.enable'] = true;
    else workspaceJson.settings = {'deno.enable': true};
    await fsPromises.writeFile(workspace.workspaceFile.fsPath, JSON.stringify(workspaceJson, null, 2), {encoding: 'utf-8'})
  }
  if (!!(await window.showWarningMessage('Reload this project to enable Deno extesion?', { modal: true }, 'Yes'))) commands.executeCommand('workbench.action.reloadWindow');
}
