'use strict';

import * as vscode from 'vscode';
import { getTargetFolder } from '../util/getTargetFolder';
import { execInitProject } from '../util/denofuncWrapper';

export async function initProject() {
  // The code you place here will be executed every time your command is executed

  if (!vscode.workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await vscode.window.showErrorMessage(message);
    return;
  }

  const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
  if (!f) return;

  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: 'DenoFunc - Initializing...',
    cancellable: false
  }, async () => {
    const { stdout } = await execInitProject({
      cwd: f.description
    });
    return Promise.resolve(stdout);
  });
  await vscode.window.showInformationMessage(`Initialize Project: The directory \`${f.label}\` was initialized.`);
}
