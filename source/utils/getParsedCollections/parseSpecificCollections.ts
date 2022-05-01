import { MongoScanner } from 'mongo-scanner';

import { MongoExportExportingOptions } from '@/types/options/exportingOptions';
import { SpecificCollections, instanceOfGeneralCollection, GeneralCollection } from '@/types/options/exportedOptions';
import { DetailedExportSchema } from '@/types/result';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseGeneralCollection } from './parseGeneralCollections';

async function parseGeneralCollectionsInDb(
    rootOptions: MongoExportExportingOptions,
    db: string,
    collections: GeneralCollection[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    for (const collection of collections) {
        await parseGeneralCollection(rootOptions, db, collection, result, mongoScanner);
    }
}

export async function parseSpecificCollections(
    rootOptions: MongoExportExportingOptions,
    specific: SpecificCollections[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    for (const collections of specific) {
        for (const db in collections) {
            let dbOptions: MongoExportExportingOptions = {};
            let colls: GeneralCollection[];

            const dbInfo: any = collections[db];
            if (Array.isArray(dbInfo)) {
                colls = dbInfo;
            } else if (instanceOfGeneralCollection(dbInfo)) {
                colls = [dbInfo];
            } else {
                dbOptions = purgeExportingOptions(dbInfo);
                colls = dbInfo.collections;
            }
            const exportingOptions: MongoExportExportingOptions = { ...rootOptions, ...dbOptions };

            await parseGeneralCollectionsInDb(exportingOptions, db, colls, result, mongoScanner);
        }
    }
}
