/**
 * The class of the errors of the module mongoback
 */
export class MongoBackError extends Error {
    public constructor(message?: string) {
        super(message);
    }
}
