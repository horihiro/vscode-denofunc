'use strict';

import { window, workspace, commands, Uri, TextEdit, Range, Position, Selection, QuickPickOptions, ProgressLocation } from 'vscode';
import { promises as fsPromises } from 'fs';
import * as os from 'os';
import * as crypto from 'crypto';

import { ExecOptions } from 'child_process';
import { spawnAsync } from '../utils/spawn';

import { channel } from '../utils/outputChannel';
import { pickTargetFolder, pickFunction } from '../utils/picker';
import { initProject } from './initProject';
import { bindingTemplates as bindings } from '../templates/bindings';


const getFunctionMetadata = async function (contents: string, options: ExecOptions) {
  // create temporary function file from current document contents
  const filename = `tmp${crypto.randomBytes(4).readUInt32LE(0)}.ts`;
  const tmpdir = os.tmpdir();
  // replace path to `deps.ts` in temporary function file
  await fsPromises.writeFile(`${tmpdir}/${filename}`, contents.replace(/^(import [ \t\S]+ from ["'])/mg, `$1file://${options.cwd?.replace(/\\/g, '/')}/functions/`));
  try {
    // get metadata from temporary function file
    const { stdout } = await spawnAsync(`deno eval "import func from 'file://${tmpdir.replace(/\\/g, '/')}/${filename}'; console.log(JSON.stringify(func.metadata))"`, options);
    await fsPromises.unlink(`${tmpdir}/${filename}`);
    try {
      return JSON.parse(stdout);
    } catch {
      // Failed to get metadata though `deno eval` was succeeded.
      return
    }
  } catch {
    // Failed to execute `deno eval`
    await fsPromises.unlink(`${tmpdir}/${filename}`);
    throw new Error
  }
}

const selectBinding = async function (options?: QuickPickOptions): Promise<string | undefined> {

  const direction = await window.showQuickPick(['in', 'out'], options);
  if (!direction) return;
  const binding = await window.showQuickPick(bindings.filter(b => b.direction === direction), options);
  if (!binding) return;

  const obj: any = {};
  Object.keys(binding).filter(k => k !== 'label' && k !== 'reference').forEach(k => {
    obj[k] = binding[k];
  });
  const jsonStringLines = JSON.stringify(obj, null, 2).split(/\n/);
  jsonStringLines.unshift(
    `// This is a template for the \`${binding.label}\` ${direction}put binding, so this needs to be edited.`,
    `// More info: ${binding.reference}`
  ); // add reference link.
  return jsonStringLines.map(l => l.replace(/"([^"]+)": "([^"]*)"/, '$1: \'$2\'')).join('\n');
};

export async function addBinding() {
  if (!workspace.workspaceFolders) {
    const message = 'DenoFunc: Working folder not found, open a folder and try again';
    window.showErrorMessage(message);
    return;
  }
  const f = await pickTargetFolder({ placeHolder: 'Select folder you want to add a function.' });
  if (!f) return;

  try {
    await fsPromises.stat(`${f.description}${f.label}/host.json`);
  } catch {
    if (!(await window.showWarningMessage('The selected folder is not a function project. Create new project?', { modal: true }, 'Yes'))) return;
    await initProject(`${f.description}${f.label}`);
  }

  const functionItem = await pickFunction(`${f.description}${f.label}/functions`, { placeHolder: 'Select Function' });
  if (!functionItem) return;

  const selectedBinding = await selectBinding();
  if (!selectedBinding) return;

  await window.withProgress({
    location: ProgressLocation.Notification,
    title: 'DenoFunc',
    cancellable: false
  }, async (progress) => {
    progress.report({ message: ` Adding binding...` });
    const uri = Uri.file(`${f.description}${f.label}/functions/${functionItem.label}`);
    await commands.executeCommand('vscode.open', uri);

    const activeEditor = window.activeTextEditor;
    if (!activeEditor) return;

    const contents = activeEditor.document.getText();
    let bindingJsonString: string;
    let match: RegExpExecArray | null;

    try {
      progress.report({ message: ` Parsing \`${functionItem.label}\`...` });
      const metadata = await getFunctionMetadata(contents, {
        cwd: f.description + f.label
      });

      if (!metadata) {
        match = /export\s+default\s+\{/.exec(contents);
        if (!match) return;
        bindingJsonString = `\nmetadata: {\nbindings: [\n${selectedBinding}\n]\n},\n`;
      } else if (!metadata.bindings) {
        match = /['"]?metadata['"]?\s*:\s*\{/.exec(contents);
        if (!match) return;
        bindingJsonString = `\nbindings: [\n${selectedBinding}\n]\n`;
      } else {
        match = /['"]?bindings['"]?\s*:\s*\[/.exec(contents);
        if (!match) return;
        bindingJsonString = `\n${selectedBinding}${metadata.bindings.length > 0 ? ',' : ''}`;
      }
    } catch {
      window.showErrorMessage(`Failed to parse \`${functionItem.label}\``);
      match = /export\s+default\s+\{/.exec(contents);
      if (!match) return;
      bindingJsonString = `\n// metadata: {\n// bindings: [\n${selectedBinding.split(/\n/).map(l => `// ${l}`).join('\n')}\n// ]\n// },\n`;
    }
    const position = match.index + match[0].length;
    const lines = contents.slice(0, position).split(/\n/);
    const insertPosition = new Position(lines.length - 1, lines[lines.length - 1].length);
    await activeEditor.edit((editBuilder) => {
      editBuilder.insert(insertPosition, bindingJsonString)
    });
    const bindingJsonStringLines = bindingJsonString.split(/\n/);
    const selectionEndPosition = new Position(insertPosition.line + bindingJsonStringLines.length - 1, bindingJsonStringLines[bindingJsonStringLines.length - 1].length + 1);
    activeEditor.selection = new Selection(insertPosition, selectionEndPosition);
    await commands.executeCommand('editor.action.formatSelection');
  });
}
