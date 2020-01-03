import { MongoBackError } from './mongoBackError';

export class MongoexportNotInstalledError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Mongoexport is not installed';
    public triggerError: Error;

    constructor(message?: string, triggerError?: Error) {
        super(message || MongoexportNotInstalledError.DEFAULT_MESSAGE);
        this.name = 'MongoBackMongoexportNotInstalledError';
        this.triggerError = triggerError || null;
    }

}