import { ExportedIndipendentCollections } from "./exportedIndipendentCollectionsOptions";
import { ExportingOptions } from "../exportingOptions";
import { ExportedCollection } from "./exportedCollectionsOptions";

export type ExportedDatabaseCollectionsInfo = ExportingOptions & ({ collections: ExportedIndipendentCollections });
export type ExportedDatabaseCollections = ExportedIndipendentCollections | ExportedDatabaseCollectionsInfo;

export interface ExportedCollectionsWithDatabase {
    [db: string]: ExportedDatabaseCollections;
};

export function instanceOfExportedCollectionsWithDatabase(obj: ExportedCollection): obj is ExportedCollectionsWithDatabase {
    return (
        typeof obj === 'object'
        &&  (
            !('name' in obj)
            || (Array.isArray(obj.name))
            || ('collections' in (obj.name as any))
        )
    );
}