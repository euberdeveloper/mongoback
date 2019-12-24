import { ExportingOptions, OptionedExportedDatabase, LambdaExportedDatabase, ExportedDatabase, instanceOfLambdaExportedDatabase, ExportedDatabases } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";
import { purgeExportingOptions } from "./purgeExportingOptions";
import { parseCollection } from "./parseCollection";
import * as database from '../database';

async function parseDatabase(rootOptions: ExportingOptions, db: string, parsed: ParsedCollections): Promise<void> {
    const collections = await database.listCollections(db);

    collections.forEach(collection => {
        parseCollection(rootOptions, db, collection, parsed);
    });
}

async function parseExportedDatabaseString(rootOptions: ExportingOptions, db: string, actualDatabases: string[], parsed: ParsedCollections): Promise<void> {
    if (actualDatabases.includes(db)) {
        await parseDatabase(rootOptions, db, parsed);
    }
}

async function parseExportedDatabaseRegexp(rootOptions: ExportingOptions, db: RegExp, actualDatabases: string[], parsed: ParsedCollections): Promise<void> {
    const databases = actualDatabases.filter(actualDb => db.test(actualDb));

    for (const db of databases) {
        await parseDatabase(rootOptions, db, parsed);
    }
}

async function parseExportedDatabaseObject(rootOptions: ExportingOptions, db: OptionedExportedDatabase, actualDatabases: string[], parsed: ParsedCollections): Promise<void> {    
    const dbOptions = purgeExportingOptions(db);
    const exportingOptions = { ...rootOptions, ...dbOptions };

    if (typeof db.name === 'string') {
        await parseExportedDatabaseString(exportingOptions, db.name, actualDatabases, parsed);
    }
    else {
        await parseExportedDatabaseRegexp(exportingOptions, db.name, actualDatabases, parsed);
    }
}

async function parseExportedDatabaseLambda(rootOptions: ExportingOptions, lambda: LambdaExportedDatabase, actualDatabases: string[], parsed: ParsedCollections): Promise<void> {
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
            await parseExportedDatabaseString(rootOptions, db, actualDatabases, parsed);
        }
        else if (db) {
            await parseExportedDatabaseObject(rootOptions, db, actualDatabases, parsed);
        }
    }
}

async function parseExportedDatabase(rootOptions: ExportingOptions, db: ExportedDatabase, actualDatabases: string[], parsed: ParsedCollections): Promise<void> {
    if (typeof db === 'string') {
        await parseExportedDatabaseString(rootOptions, db, actualDatabases, parsed);
    }
    else if (db instanceof RegExp) {
        await parseExportedDatabaseRegexp(rootOptions, db, actualDatabases, parsed);
    }
    else if (instanceOfLambdaExportedDatabase(db)) {
        await parseExportedDatabaseLambda(rootOptions, db, actualDatabases, parsed);
    }
    else {
        await parseExportedDatabaseObject(rootOptions, db, actualDatabases, parsed);
    }
}

export async function parseExportedDatabases(rootOptions: ExportingOptions, databases: ExportedDatabases, parsedCollections: ParsedCollections): Promise<void> {
    if (databases.length) {
        const actualDatabases = await database.listDatabases();

        for (const db of databases) {
            await parseExportedDatabase(rootOptions, db, actualDatabases, parsedCollections);
        }
    }
}
