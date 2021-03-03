'use strict';

import { window, workspace } from 'vscode';
import { channel } from '../utils/outputChannel';
import { getTargetFolder } from '../utils/getTargetFolder';
import { functionTemplates } from '../templates';
import { promises as fsPromises } from 'fs';
import { initProject } from './initProject';

export async function createFunction() {
  if (!workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to add a function.' });
  if (!f) return;

  try {
    await fsPromises.stat(`${f.description}${f.label}/host.json`);
  } catch {
    if (!(await window.showWarningMessage('The selected folder is not a function project. Create new project?', { modal: true }, 'Yes'))) return;
    await initProject(`${f.description}${f.label}`);
  }
  const selectedTemplate = await window.showQuickPick(functionTemplates);
  if (!selectedTemplate) return;

  // create function file under ./functions 
  const functionName = await window.showInputBox({
    validateInput: async (newFuncName: string) => {
      if (!newFuncName) return;
      try {
        const stat = await fsPromises.stat(`${f.description}${f.label}/functions/${newFuncName}.ts`);
        return `Function \`${newFuncName}\` alreay exists`;
      } catch { return ''; }
    }
  });
  if (!functionName) return;

  const functionContent = Function(`"use strict";const functionName = '${functionName}'; return \`` + selectedTemplate.template + '`;')();
  await fsPromises.writeFile(`${f.description}${f.label}/functions/${functionName}.ts`, functionContent, { encoding: 'UTF-8' });

  const message = `${selectedTemplate.label} Function \`${functionName}\` is created.`;
  channel.appendLine(message);
  window.showInformationMessage(message);
}
