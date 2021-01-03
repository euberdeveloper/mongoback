/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The class of the errors of the module mongoback.
 */
export class MongoBackError extends Error {
    public __proto__: Error;

    constructor(message?: string) {
        // This includes a trick in order to make the instanceof properly work
        const trueProto = new.target.prototype;
        super(message);
        this.__proto__ = trueProto;

        this.name = 'MongoBackError';
    }
}
