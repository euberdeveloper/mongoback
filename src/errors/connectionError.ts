import { MongoBackError } from "./mongoBackError";

export class ConnectionError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error in connecting to MongoDB';
    public uri: string;
    public options: string;
    public triggerError: Error;

    constructor(message?: string, uri?: string, options?: any, triggerError?: Error) {
        super(message || ConnectionError.DEFAULT_MESSAGE);
        this.name = 'MongoBackConnectionError';
        this.uri = uri || null;
        this.options = options || null;
        this.triggerError = triggerError || null;
    }

}