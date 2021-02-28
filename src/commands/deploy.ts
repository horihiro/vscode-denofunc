'use strict';

import * as vscode from 'vscode';
import { getTargetFolder } from '../util/getTargetFolder';
import { execDeploy, execDeploySlot } from '../util/denofuncWrapper';
import { execAzFuncAppList, execAzFuncAppSlotList } from '../util/azWrapper';

const PRODUCTION_SLOT = 'Production';

const selectFunctionApp = async () => {
  try {
    const functionapps = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'DenoFunc - Getting Function Apps...',
      cancellable: false
    }, async () => execAzFuncAppList());
    return await vscode.window.showQuickPick(functionapps, { placeHolder: 'Select function app you want to deploy to.' });
  } catch (e) {
    await vscode.window.showErrorMessage(e.stderr);
    return '';
  }
};

const selectFunctionAppSlot = async (appName: string) => {
  try {
    const functionappslots = await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `DenoFunc - Getting slots of Function App \`${appName}\`...`,
      cancellable: false
    }, async () => execAzFuncAppSlotList(appName));
    if (functionappslots.length > 0) return await vscode.window.showQuickPick(functionappslots, { placeHolder: `Select slot of function app \`${appName}\` you want to deploy to.` });
    const result = await vscode.window.showInformationMessage(`There is no deployment slots in ${appName}.\nDo you want to deploy to Production slot?`, 'Yes', 'No');
    return result?.toLocaleLowerCase() === 'yes' ? PRODUCTION_SLOT : '';
  } catch (e) {
    await vscode.window.showErrorMessage(e.stderr);
    return '';
  }
};

export async function deploy() {
  if (!vscode.workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await vscode.window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
  if (!f) return;

  const appName = await selectFunctionApp();
  if (!appName) return;

  await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: `DenoFunc - Deploying to \`${appName}\`...`,
    cancellable: false
  }, async () => {
    const { stdout } = await execDeploy(appName, {
      cwd: f.description
    });
    return Promise.resolve(stdout);
  });

  await vscode.window.showInformationMessage('Deployment is succeeded.');
}

export async function deploySlot() {
  if (!vscode.workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await vscode.window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
  if (!f) return;

  const appName = await selectFunctionApp();
  if (!appName) return;

  const slotName = await selectFunctionAppSlot(appName);
  if (!slotName) return;

  vscode.window.showErrorMessage('Deploy to Slot: Not implemented.');

  // await vscode.window.withProgress({
  //   location: vscode.ProgressLocation.Notification,
  //   title: `DenoFunc - Deploying to slot \`${slotName}\` of \`${appName}\`...`,
  //   cancellable: false
  // }, async () => {
  //   const { stdout } = await (slotName !== PRODUCTION_SLOT
  //     ? execDeploySlot(appName, slotName, {
  //       cwd: f.description
  //     })
  //     : execDeploy(appName, {
  //       cwd: f.description
  //     }));

  //   return Promise.resolve(stdout);
  // });

}