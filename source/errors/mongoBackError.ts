/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The class of the errors of the module mongoback.
 */
export class MongoBackError extends Error {
    public __proto__: Error;

    constructor(message?: string) {
        // This includes a trick in order to make the instanceof properly work
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = 'MongoBackError';
    }
}
