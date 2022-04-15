import { MongoBackError } from './mongoBackError';

/**
 * The MongoBackError that happens because mongoexport is not installed
 */
export class MongoBackMongoexportNotInstalledError extends MongoBackError {
    private static readonly DEFAULT_MESSAGE = 'Mongoexport is not installed';
    /**
     * The error that triggered the problem
     */
    public triggerError: Error | null;

    constructor(message?: string, triggerError?: Error) {
        super(message ?? MongoBackMongoexportNotInstalledError.DEFAULT_MESSAGE);
        this.name = 'MongoBackMongoexportNotInstalledError';
        this.triggerError = triggerError ?? null;
    }
}
