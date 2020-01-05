import { MongoBackError } from './mongoBackError';
import { MongoScannerError } from 'mongo-scanner';

/**
 * The MongoBackError that happens because of an operation with MongoDB
 */
export class DatabaseError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error on an operation with MongoDB';
    /**
     * The error that triggered the problem
     */
    public triggerError: MongoScannerError;

    constructor(message?: string, triggerError?: MongoScannerError) {
        super(message || (triggerError && triggerError.message) || DatabaseError.DEFAULT_MESSAGE);
        this.name = 'MongoBackDatabaseError';
        this.triggerError = triggerError || null;
    }

}