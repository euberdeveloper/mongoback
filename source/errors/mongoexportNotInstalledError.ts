import { MongoBackError } from './mongoBackError';

/**
 * The MongoBackError that happens because mongoexport is not installed
 */
export class MongoexportNotInstalledError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Mongoexport is not installed';
    /**
     * The error that triggered the problem
     */
    public triggerError: Error;

    constructor(message?: string, triggerError?: Error) {
        super(message || MongoexportNotInstalledError.DEFAULT_MESSAGE);
        this.name = 'MongoBackMongoexportNotInstalledError';
        this.triggerError = triggerError || null;
    }

}