export * from './standardExportingOptions';
export * from './extendedExportingOptions';

import { StandardExportingOptions } from './standardExportingOptions';
import { ExtendedExportingOptions } from './extendedExportingOptions';

/**
 * The options about how the collections will be exported. They will define both
 * the options of the mongoexport command and others not regarding it.
 *
 * See the mongoexport official documentation to further information.
 *
 * @see {@link https://www.mongodb.com/docs/database-tools} to further
 * information on the mongoexport/mongodump options.
 */
export type ExportingOptions = StandardExportingOptions & ExtendedExportingOptions;
