import { MongoExportExportingOptions } from '@/types/options/exportingOptions';
import {
    Collection,
    SpecificCollections,
    instanceOfGeneralCollection,
    GeneralCollection
} from '@/types/options/exportedOptions';
import { DetailedExportSchema } from '@/types/result';

export function divideCollections(collections: Collection[]): {
    general: GeneralCollection[];
    specific: SpecificCollections[];
} {
    const specific: SpecificCollections[] = [];
    const general: GeneralCollection[] = [];

    for (const collection of collections)
        instanceOfGeneralCollection(collection) ? general.push(collection) : specific.push(collection);

    return {
        specific,
        general
    };
}

export function parseCollection(
    exportingOptions: MongoExportExportingOptions,
    db: string,
    name: string,
    parsed: DetailedExportSchema
): void {
    const collection = { name, ...exportingOptions };
    if (!(db in parsed)) {
        parsed[db] = [collection];
    } else if (!parsed[db].some(coll => coll.name === name)) {
        parsed[db].push(collection);
    }
}
