import { MongoScanner } from 'mongo-scanner';

import { ExportingOptions, OptionedExportedDatabase, LambdaExportedDatabase, ExportedDatabase, instanceOfLambdaExportedDatabase, ExportedDatabases } from '../../interfaces/options';
import { ParsedCollections } from '../../interfaces/parsedCollections';

import { purgeExportingOptions } from './purgeExportingOptions';
import { parseCollection } from './parseCollection';

async function parseDatabase(rootOptions: ExportingOptions, db: string, parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    const collections = await mongoScanner.listCollections(db);

    collections.forEach(collection => {
        parseCollection(rootOptions, db, collection, parsed);
    });
}

async function parseExportedDatabaseString(rootOptions: ExportingOptions, db: string, actualDatabases: string[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    if (actualDatabases.includes(db)) {
        await parseDatabase(rootOptions, db, parsed, mongoScanner);
    }
}

async function parseExportedDatabaseRegexp(rootOptions: ExportingOptions, db: RegExp, actualDatabases: string[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    const databases = actualDatabases.filter(actualDb => db.test(actualDb));

    for (const db of databases) {
        await parseDatabase(rootOptions, db, parsed, mongoScanner);
    }
}

async function parseExportedDatabaseObject(rootOptions: ExportingOptions, db: OptionedExportedDatabase, actualDatabases: string[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {    
    const dbOptions = purgeExportingOptions(db);
    const exportingOptions = { ...rootOptions, ...dbOptions };

    if (typeof db.name === 'string') {
        await parseExportedDatabaseString(exportingOptions, db.name, actualDatabases, parsed, mongoScanner);
    }
    else {
        await parseExportedDatabaseRegexp(exportingOptions, db.name, actualDatabases, parsed, mongoScanner);
    }
}

async function parseExportedDatabaseLambda(rootOptions: ExportingOptions, lambda: LambdaExportedDatabase, actualDatabases: string[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    const databases = actualDatabases.map(db => {
        const result = lambda(db);
        if (result === true) {
            return db;
        }
        else if (result) {
            return { ...result, name: db } as OptionedExportedDatabase;
        }
    });

    for (const db of databases) {
        if (typeof db === 'string') {
            await parseExportedDatabaseString(rootOptions, db, actualDatabases, parsed, mongoScanner);
        }
        else if (db) {
            await parseExportedDatabaseObject(rootOptions, db, actualDatabases, parsed, mongoScanner);
        }
    }
}

async function parseExportedDatabase(rootOptions: ExportingOptions, db: ExportedDatabase, actualDatabases: string[], parsed: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    if (typeof db === 'string') {
        await parseExportedDatabaseString(rootOptions, db, actualDatabases, parsed, mongoScanner);
    }
    else if (db instanceof RegExp) {
        await parseExportedDatabaseRegexp(rootOptions, db, actualDatabases, parsed, mongoScanner);
    }
    else if (instanceOfLambdaExportedDatabase(db)) {
        await parseExportedDatabaseLambda(rootOptions, db, actualDatabases, parsed, mongoScanner);
    }
    else {
        await parseExportedDatabaseObject(rootOptions, db, actualDatabases, parsed, mongoScanner);
    }
}

export async function parseExportedDatabases(rootOptions: ExportingOptions, databases: ExportedDatabases, parsedCollections: ParsedCollections, mongoScanner: MongoScanner): Promise<void> {
    if (databases.length) {
        const actualDatabases = await mongoScanner.listDatabases();

        for (const db of databases) {
            await parseExportedDatabase(rootOptions, db, actualDatabases, parsedCollections, mongoScanner);
        }
    }
}
