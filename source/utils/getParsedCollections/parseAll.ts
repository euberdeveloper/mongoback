import { MongoScanner } from 'mongo-scanner';

import { MongoExportExportingOptions } from '@/types/options';
import { DetailedExportSchema } from '@/types/result';

import { parseCollection } from './parseCollection';

export async function parseAll(
    rootOptions: MongoExportExportingOptions,
    all: boolean,
    result: DetailedExportSchema,
    dbSchema: MongoScanner
): Promise<void> {
    if (all) {
        const databases = await dbSchema.listDatabases();

        for (const db of databases) {
            const collections = await dbSchema.listCollections(db);

            for (const collection of collections) parseCollection(rootOptions, db, collection, result);
        }
    }
}
