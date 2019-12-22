import { sync as commandExists } from 'command-exists';

export function mongoexportInstalled(): boolean {
    return commandExists('mongoexport');
}