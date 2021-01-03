import { MongoBackError } from './mongoBackError';

/**
 * The MongoBackError that happens because of an error with mongoexport
 */
export class ExportingError extends MongoBackError {
    private static readonly DEFAULT_MESSAGE = 'Error in exporting collection';
    /**
     * The database whose collection should have been exported
     */
    public db: string | null;
    /**
     * The collection that should have been exported
     */
    public collection: string | null;
    /**
     * The mongoexport command
     */
    public command: string | null;
    /**
     * The mongoexport log
     */
    public log: string | null;
    /**
     * The error that triggered the problem
     */
    public triggerError: Error | null;

    constructor(
        message?: string,
        db?: string,
        collection?: string,
        command?: string,
        log?: string,
        triggerError?: Error
    ) {
        super(message ?? ExportingError.DEFAULT_MESSAGE);
        this.name = 'MongoBackExportingError';
        this.db = db ?? null;
        this.collection = collection ?? null;
        this.command = command ?? null;
        this.log = log ?? null;
        this.triggerError = triggerError ?? null;
    }
}
