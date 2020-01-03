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

export type Options = ConnectionOptions & ExportedOptions & ExportingOptions & LogOptions & OutOptions;