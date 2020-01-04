import { ExportedIndipendentCollection } from './exportedIndipendentCollectionsOptions';
import { ExportedCollectionsWithDatabase } from './exportedCollectionsWithDatabase';

export type ExportedCollection = ExportedCollectionsWithDatabase | ExportedIndipendentCollection;
export type ExportedCollections = ExportedCollection[] | ExportedCollection;