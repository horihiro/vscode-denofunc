import { platform } from 'os';
import { SemVer } from "semver";
import { spawnAsync } from './spawn';

const whereOrWhich = platform() === 'win32' ? 'where' : 'which';
const catOrType = platform() === 'win32' ? 'type' : 'cat';

export const getDenoFuncVersion = async (denofuncCommand: string): Promise<string | SemVer> => {
  const pathToDenofunc = (await spawnAsync(`${whereOrWhich} ${denofuncCommand}`))?.stdout;
  const content = (await spawnAsync(`${catOrType} ${pathToDenofunc.split('\n')[0]}`)).stdout;
  const versionOfDenoFunc = content.replace(/^[\w\W]*\/(v\d+\.\d+\.\d+[^/]*)\/[\w\W]*$/, '$1');
  return /^v\d+\.\d+\.\d+[^/]*/.test(versionOfDenoFunc) ? versionOfDenoFunc : undefined;
}