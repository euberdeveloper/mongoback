export * from './connectionOptions';
export * from './exportedOptions';
export * from './exportingOptions';
export * from './logOptions';
export * from './outOptions';

import { ConnectionOptions } from './connectionOptions';
import { ExportedOptions } from './exportedOptions';
import { ExportingOptions } from './exportingOptions';
import { LogOptions } from './logOptions';
import { OutOptions } from './outOptions';

/**
 * The options of the mongoexport function.
 * 
 * Some of the properties are exactly the same of the mongoexport options. Some are 
 * slightly modified to allow a more confortable usage, without changing what will
 * be passed as a mongoexport option. The default value of those option does not corrispond
 * with the mongoexport one. When there is a value set to false or undefined, it means that
 * the option is not added to the mongoexport command, not that it is the default value of
 * mongoexport.
 * 
 * To support the old versions of mongoexport, there are also the deprecated options.
 * 
 * See the mongoexport official documentation to further information.
 * 
 * @see {@link https://docs.mongodb.com/manual/reference/program/mongoexport/} to further
 * information on the mongoexport options.
 */
export type Options = ConnectionOptions & ExportedOptions & ExportingOptions & LogOptions & OutOptions;