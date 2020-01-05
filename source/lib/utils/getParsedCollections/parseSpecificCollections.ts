import { MongoScanner } from 'mongo-scanner';

import { ExportingOptions } from '../../interfaces/options/exportingOptions';
import { SpecificCollections, instanceOfGeneralCollection, GeneralCollection } from '../../interfaces/options/exportedOptions';
import { DetailedExportSchema } from '../../interfaces/result';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseGeneralCollection } from './parseGeneralCollections';

async function parseGeneralCollectionsInDb(rootOptions: ExportingOptions, db: string, collections: GeneralCollection[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    for (const collection of collections) {
        await parseGeneralCollection(rootOptions, db, collection, result, mongoScanner);
    }
}

export async function parseSpecificCollections(rootOptions: ExportingOptions, specific: SpecificCollections[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    for (const collections of specific) {
        for (const db in collections) {
            let dbOptions: ExportingOptions = {};
            let colls: GeneralCollection[];

            const dbInfo = collections[db];
            if (Array.isArray(dbInfo)) {
                colls = dbInfo;
            }
            else if (instanceOfGeneralCollection(dbInfo)) {
                colls = [dbInfo];
            }
            else {
                dbOptions = purgeExportingOptions(dbInfo);
                colls = dbInfo.collections;
            }
            const exportingOptions: ExportingOptions = { ...rootOptions, ...dbOptions };

            await parseGeneralCollectionsInDb(exportingOptions, db, colls, result, mongoScanner);
        }
    }
}