import { MongoBackError } from "./mongoBackError";

export class ListCollectionsError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error in listing collections';
    public db: string;
    public triggerError: Error;

    constructor(message?: string, db?: string, triggerError?: Error) {
        super(message || ListCollectionsError.DEFAULT_MESSAGE);
        this.name = 'MongoBackListCollectionsError';
        this.db = db;
        this.triggerError = triggerError || null;
    }

}