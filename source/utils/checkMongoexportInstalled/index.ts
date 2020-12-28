import { sync as commandExists } from 'command-exists';
import { MongoexportNotInstalledError } from '../../errors';

function mongoexportInstalled(): boolean {
    return commandExists('mongoexport');
}

export function checkMongoexportInstalled(): void {
    if (!mongoexportInstalled()) {
        throw new MongoexportNotInstalledError();
    }
}
