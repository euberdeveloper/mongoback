import { MongoBackError } from './mongoBackError';

/**
 * The MongoBackError that happens because mongodump is not installed
 */
export class MongodumpNotInstalledError extends MongoBackError {
    private static readonly DEFAULT_MESSAGE = 'Mongodump is not installed';
    /**
     * The error that triggered the problem
     */
    public triggerError: Error | null;

    constructor(message?: string, triggerError?: Error) {
        super(message ?? MongodumpNotInstalledError.DEFAULT_MESSAGE);
        this.name = 'MongoBackMongodumpNotInstalledError';
        this.triggerError = triggerError ?? null;
    }
}
