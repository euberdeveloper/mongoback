import { MongoScanner } from 'mongo-scanner';

import { MongoExportExportingOptions } from '@/types/options/exportingOptions';
import {
    GeneralCollection,
    instanceofLambdaCollection,
    LambdaCollection,
    DetailedCollection
} from '@/types/options/exportedOptions';
import { DetailedExportSchema } from '@/types/result';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseCollection } from './parseCollection';

function parseStringCollection(
    rootOptions: MongoExportExportingOptions,
    db: string,
    collection: string,
    actualCollections: string[],
    result: DetailedExportSchema
): void {
    if (actualCollections.includes(collection)) {
        parseCollection(rootOptions, db, collection, result);
    }
}

function parseRegExpCollection(
    rootOptions: MongoExportExportingOptions,
    db: string,
    collection: RegExp,
    actualCollections: string[],
    result: DetailedExportSchema
): void {
    const colls = actualCollections.filter(coll => collection.test(coll));
    for (const coll of colls) parseCollection(rootOptions, db, coll, result);
}

function parseDetailedCollection(
    rootOptions: MongoExportExportingOptions,
    db: string,
    collection: DetailedCollection,
    actualCollections: string[],
    result: DetailedExportSchema
): void {
    const collectionsOptions = purgeExportingOptions(collection);
    const exportingOptions = { ...rootOptions, ...collectionsOptions };

    const collections = collection.match;
    if (typeof collections === 'string') {
        parseStringCollection(exportingOptions, db, collections, actualCollections, result);
    } else {
        parseRegExpCollection(exportingOptions, db, collections, actualCollections, result);
    }
}

function parseLambdaCollection(
    rootOptions: MongoExportExportingOptions,
    db: string,
    lambda: LambdaCollection,
    actualCollections: string[],
    result: DetailedExportSchema
): void {
    const collections = actualCollections
        .map(collection => {
            const result = lambda(db, collection);
            if (result === true) {
                return collection;
            } else if (result) {
                return { ...result, match: collection } as DetailedCollection;
            }
        })
        .filter(collection => collection);

    for (const collection of collections) {
        if (typeof collection === 'string') {
            parseStringCollection(rootOptions, db, collection, actualCollections, result);
        } else {
            parseDetailedCollection(rootOptions, db, collection as any, actualCollections, result);
        }
    }
}

export async function parseGeneralCollection(
    rootOptions: MongoExportExportingOptions,
    db: string,
    collection: GeneralCollection,
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    const actualCollections: string[] = await mongoScanner.listCollections(db);

    if (typeof collection === 'string') {
        parseStringCollection(rootOptions, db, collection, actualCollections, result);
    } else if (collection instanceof RegExp) {
        parseRegExpCollection(rootOptions, db, collection, actualCollections, result);
    } else if (instanceofLambdaCollection(collection)) {
        parseLambdaCollection(rootOptions, db, collection, actualCollections, result);
    } else {
        parseDetailedCollection(rootOptions, db, collection, actualCollections, result);
    }
}

export async function parseGeneralCollections(
    rootOptions: MongoExportExportingOptions,
    collections: GeneralCollection[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    if (collections.length) {
        const databases = await mongoScanner.listDatabases();

        for (const collection of collections) {
            for (const db of databases) {
                await parseGeneralCollection(rootOptions, db, collection, result, mongoScanner);
            }
        }
    }
}
