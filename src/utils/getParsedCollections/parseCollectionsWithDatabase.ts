import { MongoScanner } from "mongo-scanner";

import { ExportingOptions, ExportedIndipendentCollections, ExportedCollectionsWithDatabase } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";
import { purgeExportingOptions } from "./purgeExportingOptions";
import { parseIndipendentCollection } from "./parseIndipendentCollections";

async function parseIndipendentCollectionsWithDb(rootOptions: ExportingOptions, db: string, collections: ExportedIndipendentCollections, parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    for (const collection of collections) {
        await parseIndipendentCollection(rootOptions, db, collection, parsed, mongoScanner);
    }
}

export async function parseCollectionsWithDatabase(rootOptions: ExportingOptions, collectionsWithDatabase: ExportedCollectionsWithDatabase[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    for (const collections of collectionsWithDatabase) {
        for (const db in collections) {
            let dbOptions: ExportingOptions = {};
            let colls: ExportedIndipendentCollections;

            const dbInfo = collections[db];
            if (Array.isArray(dbInfo)) {
                colls = dbInfo;
            }
            else {
                dbOptions = purgeExportingOptions(dbInfo);
                colls = dbInfo.collections;
            }
            const exportingOptions: ExportingOptions = { ...rootOptions, ...dbOptions };

            await parseIndipendentCollectionsWithDb(exportingOptions, db, colls, parsed, mongoScanner);
        }
    }
}