import { MongoBackError } from './mongoBackError';
import { MongoScannerError } from 'mongo-scanner';

export class DatabaseError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error on an operation with MongoDB';
    public triggerError: MongoScannerError;

    constructor(message?: string, triggerError?: MongoScannerError) {
        super(message || (triggerError && triggerError.message) || DatabaseError.DEFAULT_MESSAGE);
        this.name = 'MongoBackDatabaseError';
        this.triggerError = triggerError || null;
    }

}