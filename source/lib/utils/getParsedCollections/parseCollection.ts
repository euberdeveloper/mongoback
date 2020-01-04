import { ExportingOptions, ExportedIndipendentCollections, ExportedCollectionsWithDatabase, instanceOfExportedCollectionsWithDatabase, ExportedCollection } from '../../interfaces/options';
import { ParsedCollections } from '../../interfaces/parsedCollections';

export function divideExportedCollections(collections: ExportedCollection[]): { indipendent: ExportedIndipendentCollections, withDatabase: ExportedCollectionsWithDatabase[] } {
    const withDatabase: ExportedCollectionsWithDatabase[] = [];
    const indipendent: ExportedIndipendentCollections = [];

    collections.forEach(collection => instanceOfExportedCollectionsWithDatabase(collection)
        ? withDatabase.push(collection)
        : indipendent.push(collection));

    return {
        withDatabase,
        indipendent
    };
}

export function parseCollection(exportingOptions: ExportingOptions, db: string, name: string, parsed: ParsedCollections): void {
    const collection = { name, ...exportingOptions };
    if (!(db in parsed)) {
        parsed[db] = [collection];
    }
    else if (!parsed[db].find(coll => coll.name === name)) {
        parsed[db].push(collection);
    }
}