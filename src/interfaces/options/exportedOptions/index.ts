export * from './exportedDatabasesOptions';
export * from './exportedIndipendentCollectionsOptions';
export * from './exportedCollectionsWithDatabase';
export * from './exportedCollectionsOptions';

import { ExportedDatabases } from './exportedDatabasesOptions';
import { ExportedCollections } from './exportedCollectionsOptions';

export interface ExportedOptions {
    all?: boolean;
    databases?: ExportedDatabases;
    collections?: ExportedCollections;
    systemCollections?: boolean;
};