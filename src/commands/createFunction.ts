'use strict';

import { window, workspace } from 'vscode';
import { channel } from '../utils/outputChannel';
import { getTargetFolder } from '../utils/getTargetFolder';
import { functionTemplates } from '../templates';
import { promises as fsPromises } from 'fs';



export async function createFunction() {
  if (!workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to add a function.' });
  if (!f) return;

  const selectedTemplate = await window.showQuickPick(functionTemplates);
  if (!selectedTemplate) return;

  // create function file under ./functions 
  const functionName = await window.showInputBox({
    validateInput: async (newFuncName: string) => {
      if (!newFuncName) return;
      try {
        const stat = await fsPromises.stat(`${f.description}/functions/${newFuncName}.ts`);
        return `Function \`${newFuncName}\` alreay exists`;
      } catch { return ''; }
    }
  });
  if (!functionName) return;

  await fsPromises.writeFile(`${f.description}/functions/${functionName}.ts`, selectedTemplate.template, { encoding: 'UTF-8' });
  const message = `${selectedTemplate.label} Function \`${functionName}\` is created.`;
  channel.appendLine(message);
  await window.showInformationMessage(message);
}
