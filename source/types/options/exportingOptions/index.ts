export * from './standard';
export * from './extended/extendedExportingOptions';

import { StandardMongoDumpExportingOptions, StandardMongoExportExportingOptions } from './standard';
import { ExtendedExportingOptions } from './extended/extendedExportingOptions';

/**
 * The options about how the collections will be exported. They will define both
 * the options of the mongoexport command and others not regarding it.
 *
 * See the mongoexport official documentation to further information.
 *
 * @see {@link https://www.mongodb.com/docs/database-tools/mongoexport} to further
 * information on the mongoexport options.
 */
export type MongoExportExportingOptions = StandardMongoExportExportingOptions & ExtendedExportingOptions;

/**
 * The options about how the collections will be exported. They will define both
 * the options of the mongodump command and others not regarding it.
 *
 * See the mongodump official documentation to further information.
 *
 * @see {@link https://www.mongodb.com/docs/database-tools/mongodump} to further
 * information on the mongodump options.
 */
export type MongoDumpExportingOptions = StandardMongoDumpExportingOptions & ExtendedExportingOptions;
