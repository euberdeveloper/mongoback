import { sync as commandExists } from 'command-exists';
import { MongoBackMongoexportNotInstalledError } from '@/errors';

function mongoexportInstalled(): boolean {
    return commandExists('mongoexport');
}

export function checkMongoexportInstalled(): void {
    if (!mongoexportInstalled()) {
        throw new MongoBackMongoexportNotInstalledError();
    }
}
