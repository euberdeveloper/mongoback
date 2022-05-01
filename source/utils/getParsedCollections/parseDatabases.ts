import { MongoScanner } from 'mongo-scanner';

import { MongoExportExportingOptions } from '@/types/options/exportingOptions';
import { Database, instanceOfLambdaDatabase, LambdaDatabase, DetailedDatabase } from '@/types/options/exportedOptions';
import { DetailedExportSchema } from '@/types/result';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseCollection } from './parseCollection';

async function parseDb(
    rootOptions: MongoExportExportingOptions,
    db: string,
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    const collections = await mongoScanner.listCollections(db);

    for (const collection of collections) {
        parseCollection(rootOptions, db, collection, result);
    }
}

async function parseStringDatabase(
    rootOptions: MongoExportExportingOptions,
    db: string,
    actualDatabases: string[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    if (actualDatabases.includes(db)) {
        await parseDb(rootOptions, db, result, mongoScanner);
    }
}

async function parseRegExpDatabase(
    rootOptions: MongoExportExportingOptions,
    db: RegExp,
    actualDatabases: string[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    const databases = actualDatabases.filter(actualDb => db.test(actualDb));

    for (const db of databases) {
        await parseDb(rootOptions, db, result, mongoScanner);
    }
}

async function parseDetailedDatabase(
    rootOptions: MongoExportExportingOptions,
    db: DetailedDatabase,
    actualDatabases: string[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    const dbOptions = purgeExportingOptions(db);
    const exportingOptions = { ...rootOptions, ...dbOptions };

    const databases = db.match;
    await (typeof databases === 'string'
        ? parseStringDatabase(exportingOptions, databases, actualDatabases, result, mongoScanner)
        : parseRegExpDatabase(exportingOptions, databases, actualDatabases, result, mongoScanner));
}

async function parseLambdaDatabase(
    rootOptions: MongoExportExportingOptions,
    lambda: LambdaDatabase,
    actualDatabases: string[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    const databases = actualDatabases
        .map(db => {
            const result = lambda(db);
            if (result === true) {
                return db;
            } else if (result) {
                return { ...result, match: db } as DetailedDatabase;
            }
        })
        .filter(db => db !== undefined);

    for (const db of databases) {
        if (typeof db === 'string') {
            await parseStringDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        } else if (db) {
            await parseDetailedDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        }
    }
}

async function parseDatabase(
    rootOptions: MongoExportExportingOptions,
    db: Database,
    actualDatabases: string[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    if (typeof db === 'string') {
        await parseStringDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    } else if (db instanceof RegExp) {
        await parseRegExpDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    } else if (instanceOfLambdaDatabase(db)) {
        await parseLambdaDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    } else {
        await parseDetailedDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    }
}

export async function parseDatabases(
    rootOptions: MongoExportExportingOptions,
    databases: Database[],
    result: DetailedExportSchema,
    mongoScanner: MongoScanner
): Promise<void> {
    if (databases.length) {
        const actualDatabases = await mongoScanner.listDatabases();

        for (const db of databases) {
            await parseDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        }
    }
}
