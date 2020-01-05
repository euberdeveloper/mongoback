import { ExportingOptions } from '../../interfaces/options/exportingOptions';
import { Collection, SpecificCollections, instanceOfGeneralCollection, GeneralCollection } from '../../interfaces/options/exportedOptions';
import { DetailedExportSchema } from '../../interfaces/result';

export function divideCollections(collections: Collection[]): { general: GeneralCollection[], specific: SpecificCollections[] } {
    const specific: SpecificCollections[] = [];
    const general: GeneralCollection[] = [];

    collections.forEach(collection => instanceOfGeneralCollection(collection)
        ? general.push(collection)
        : specific.push(collection));

    return {
        specific,
        general
    };
}

export function parseCollection(exportingOptions: ExportingOptions, db: string, name: string, parsed: DetailedExportSchema): void {
    const collection = { name, ...exportingOptions };
    if (!(db in parsed)) {
        parsed[db] = [collection];
    }
    else if (!parsed[db].find(coll => coll.name === name)) {
        parsed[db].push(collection);
    }
}