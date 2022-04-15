import { MongoScanner } from 'mongo-scanner';

import { ExportingOptions } from '@/interfaces/options';
import { DetailedExportSchema } from '@/interfaces/result';

import { parseCollection } from './parseCollection';

export async function parseAll(
    rootOptions: ExportingOptions,
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
