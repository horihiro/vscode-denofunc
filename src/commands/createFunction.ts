'use strict';

import * as vscode from 'vscode';
import { getTargetFolder } from '../util/getTargetFolder';
import { functionTemplates } from '../templates';
import * as fs from 'fs';



export async function createFunction() {
  if (!vscode.workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await vscode.window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to add a function.' });
  if (!f) return;

  const selectedTemplate = await vscode.window.showQuickPick(functionTemplates);
  if (!selectedTemplate) return;

  // create function file under ./functions 
  const functionName = await vscode.window.showInputBox({
    validateInput: async (newFuncName) => {
      if (!newFuncName) return;
      try {
        const stat = await fs.promises.stat(`${f.description}/functions/${newFuncName}.ts`);
        return `Function \`${newFuncName}\` alreay exists`;
      } catch { return ''; }
    }
  });
  if (!functionName) return;

  await fs.promises.writeFile(`${f.description}/functions/${functionName}.ts`, selectedTemplate.template, {encoding: 'UTF-8'});
  await vscode.window.showInformationMessage(`Function \`${functionName}\` is created.`);
}
