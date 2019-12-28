import { MongoBackError } from "./mongoBackError";

export class ListDatabasesError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error in listing databases';
    public triggerError: Error;

    constructor(message?: string, triggerError?: Error) {
        super(message || ListDatabasesError.DEFAULT_MESSAGE);
        this.name = 'MongoBackListDatabasesError';
        this.triggerError = triggerError || null;
    }

}