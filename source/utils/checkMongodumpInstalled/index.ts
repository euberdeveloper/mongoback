import { sync as commandExists } from 'command-exists';
import { MongodumpNotInstalledError } from '@/errors';

function mongodumpInstalled(): boolean {
    return commandExists('mongodump');
}

export function checkMongodumpInstalled(): void {
    if (!mongodumpInstalled()) {
        throw new MongodumpNotInstalledError();
    }
}
