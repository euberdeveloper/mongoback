import { MongoBackError } from './mongoBackError';

/**
 * The MongoBackError that happens because of an operation with MongoDB
 */
export class DatabaseError extends MongoBackError {
    private static readonly DEFAULT_MESSAGE = 'Error on an operation with MongoDB';
    /**
     * The error that triggered the problem
     */
    public triggerError: Error | null;

    constructor(message?: string, triggerError?: Error) {
        super(message ?? triggerError?.message ?? DatabaseError.DEFAULT_MESSAGE);
        this.name = 'MongoBackDatabaseError';
        this.triggerError = triggerError ?? null;
    }
}
