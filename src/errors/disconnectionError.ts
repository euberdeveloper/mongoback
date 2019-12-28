import { MongoBackError } from "./mongoBackError";

export class DisconnectionError extends MongoBackError {

    private static readonly DEFAULT_MESSAGE = 'Error in disconnecting to MongoDB';
    public uri: string;
    public options: string;
    public triggerError: Error;

    constructor(message?: string, uri?: string, options?: any, triggerError?: Error) {
        super(message || DisconnectionError.DEFAULT_MESSAGE);
        this.name = 'MongoBackDisconnectionError';
        this.uri = uri || null;
        this.options = options || null;
        this.triggerError = triggerError || null;
    }

}