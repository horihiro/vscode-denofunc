'use strict';

import { window, ProgressLocation, workspace } from 'vscode';
import { channel } from '../utils/outputChannel';
import { getTargetFolder } from '../utils/getTargetFolder';
import { execDeploy, execDeploySlot } from '../utils/denofuncWrapper';
import { execAzFuncAppList, execAzFuncAppSlotList } from '../utils/azWrapper';

const PRODUCTION_SLOT = 'Production';

const selectFunctionApp = async () => {
  try {
    const functionapps = await window.withProgress({
      location: ProgressLocation.Notification,
      title: 'DenoFunc - Getting Function Apps...',
      cancellable: false
    }, async () => {
      channel.show();
      channel.appendLine('Getting Function Apps...');
      return await execAzFuncAppList(undefined, channel)
    });
    return await window.showQuickPick(functionapps, { placeHolder: 'Select function app you want to deploy to.' });
  } catch (e) {
    await window.showErrorMessage(e.stderr);
    return '';
  }
};

const selectFunctionAppSlot = async (appName: string) => {
  try {
    const functionappslots = await window.withProgress({
      location: ProgressLocation.Notification,
      title: `DenoFunc - Getting slots of Function App \`${appName}\`...`,
      cancellable: false
    }, async () => {
      channel.show();
      channel.appendLine(`Getting slots of Function App \`${appName}\`...`);
      return await execAzFuncAppSlotList(appName, undefined, channel)
    });
    if (functionappslots.length > 0) return await window.showQuickPick(functionappslots, { placeHolder: `Select slot of function app \`${appName}\` you want to deploy to.` });
    const result = await window.showInformationMessage(`There is no deployment slots in ${appName}.\nDo you want to deploy to Production slot?`, 'Yes', 'No');
    return result?.toLocaleLowerCase() === 'yes' ? PRODUCTION_SLOT : '';
  } catch (e) {
    await window.showErrorMessage(e.stderr);
    return '';
  }
};

export async function deploy() {
  if (!workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
  if (!f) return;

  const appName = await selectFunctionApp();
  if (!appName) return;

  await window.withProgress({
    location: ProgressLocation.Notification,
    title: `DenoFunc - Deploying to \`${appName}\`...`,
    cancellable: false
  }, async () => {
    channel.show();
    channel.appendLine(`Getting slots of Function App \`${appName}\`...`);
    return await execDeploy(appName, {
      cwd: f.description
    }, channel);
  });

  await window.showInformationMessage('Deployment is succeeded.');
}

export async function deploySlot() {
  if (!workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    await window.showErrorMessage(message);
    return;
  }
  const f = await getTargetFolder({ placeHolder: 'Select folder you want to initialize.' });
  if (!f) return;

  const appName = await selectFunctionApp();
  if (!appName) return;

  const slotName = await selectFunctionAppSlot(appName);
  if (!slotName) return;

  window.showErrorMessage('Deploy to Slot: Not implemented.');

  // await window.withProgress({
  //   location: ProgressLocation.Notification,
  //   title: `DenoFunc - Deploying to slot \`${slotName}\` of \`${appName}\`...`,
  //   cancellable: false
  // }, async () => {
  //   const { stdout } = await (slotName !== PRODUCTION_SLOT
  //     ? execDeploySlot(appName, slotName, {
  //       cwd: f.description
  //     }, channel)
  //     : execDeploy(appName, {
  //       cwd: f.description
  //     }, channel));

  //   return Promise.resolve(stdout);
  // });

}