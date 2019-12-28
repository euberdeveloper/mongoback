import { MongoBackError } from "./mongoBackError";

export class ExportingError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error in exporting collection';
    public db: string;
    public collection: string;
    public command: string;
    public log: string;
    public triggerError: Error;

    constructor(message?: string, db?: string, collection?: string, command?: string, log?: string, triggerError?: Error,) {
        super(message || ExportingError.DEFAULT_MESSAGE);
        this.name = 'MongoBackExportingError';
        this.db = db || null;
        this.collection = collection || null;
        this.command = command || null;
        this.log = log || null;
        this.triggerError = triggerError || null;
    }

}