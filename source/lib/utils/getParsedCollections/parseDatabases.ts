import { MongoScanner } from 'mongo-scanner';

import { ExportingOptions } from '../../interfaces/options/exportingOptions';
import { Database, instanceOfLambdaDatabase, LambdaDatabase, DetailedDatabase } from '../../interfaces/options/exportedOptions';
import { DetailedExportSchema } from '../../interfaces/result';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseCollection } from './parseCollection';

async function parseDb(rootOptions: ExportingOptions, db: string, result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    const collections = await mongoScanner.listCollections(db);

    collections.forEach(collection => {
        parseCollection(rootOptions, db, collection, result);
    });
}

async function parseStringDatabase(rootOptions: ExportingOptions, db: string, actualDatabases: string[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    if (actualDatabases.includes(db)) {
        await parseDb(rootOptions, db, result, mongoScanner);
    }
}

async function parseRegExpDatabase(rootOptions: ExportingOptions, db: RegExp, actualDatabases: string[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    const databases = actualDatabases.filter(actualDb => db.test(actualDb));

    for (const db of databases) {
        await parseDb(rootOptions, db, result, mongoScanner);
    }
}

async function parseDetailedDatabase(rootOptions: ExportingOptions, db: DetailedDatabase, actualDatabases: string[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {    
    const dbOptions = purgeExportingOptions(db);
    const exportingOptions = { ...rootOptions, ...dbOptions };

    const databases = db.databases;
    if (typeof databases === 'string') {
        await parseStringDatabase(exportingOptions, databases, actualDatabases, result, mongoScanner);
    }
    else {
        await parseRegExpDatabase(exportingOptions, databases, actualDatabases, result, mongoScanner);
    }
}

async function parseLambdaDatabase(rootOptions: ExportingOptions, lambda: LambdaDatabase, actualDatabases: string[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    const databases = actualDatabases
        .map(db => {
            const result = lambda(db);
            if (result === true) {
                return db;
            }
            else if (result) {
                return { ...result, databases: db } as DetailedDatabase;
            }
        })
        .filter(db => db !== undefined);

    for (const db of databases) {
        if (typeof db === 'string') {
            await parseStringDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        }
        else if (db) {
            await parseDetailedDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        }
    }
}

async function parseDatabase(rootOptions: ExportingOptions, db: Database, actualDatabases: string[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    if (typeof db === 'string') {
        await parseStringDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    }
    else if (db instanceof RegExp) {
        await parseRegExpDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    }
    else if (instanceOfLambdaDatabase(db)) {
        await parseLambdaDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    }
    else {
        await parseDetailedDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
    }
}

export async function parseDatabases(rootOptions: ExportingOptions, databases: Database[], result: DetailedExportSchema, mongoScanner: MongoScanner): Promise<void> {
    if (databases.length) {
        const actualDatabases = await mongoScanner.listDatabases();

        for (const db of databases) {
            await parseDatabase(rootOptions, db, actualDatabases, result, mongoScanner);
        }
    }
}
