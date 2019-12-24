import { ExportingOptions, OptionedExportedIndipendentCollection, LambdaExportedIndipendentCollection, ExportedIndipendentCollection, instanceOfLambdaExportedIndipendentCollection, ExportedIndipendentCollections } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";

import { DatabaseSchemaCache } from "../databaseSchemaCache";
import { purgeExportingOptions } from "./purgeExportingOptions";
import { parseCollection } from "./parseCollection";

function parseIndipendentCollectionsString(rootOptions: ExportingOptions, db: string, collection: string, actualCollections: string[], parsed: ParsedCollections): void {
    if (actualCollections.includes(collection)) {
        parseCollection(rootOptions, db, collection, parsed);
    }
}

function parseIndipendentCollectionsRegExp(rootOptions: ExportingOptions, db: string, collection: RegExp, actualCollections: string[], parsed: ParsedCollections): void {
    const colls = actualCollections.filter(coll => collection.test(coll));
    colls.forEach(coll => parseCollection(rootOptions, db, coll, parsed));
}

function parseIndipendentCollectionsObject(rootOptions: ExportingOptions, db: string, collection: OptionedExportedIndipendentCollection, actualCollections: string[], parsed: ParsedCollections): void {
    const collectionsOptions = purgeExportingOptions(collection);
    const exportingOptions = { ...rootOptions, ...collectionsOptions };

    const name = collection.name;
    if (typeof name === 'string') {
        parseIndipendentCollectionsString(exportingOptions, db, name, actualCollections, parsed);
    }
    else {
        parseIndipendentCollectionsRegExp(exportingOptions, db, name, actualCollections, parsed);
    }
}

function parseIndipendentCollectionsLambda(rootOptions: ExportingOptions, db: string, lambda: LambdaExportedIndipendentCollection, actualCollections: string[], parsed: ParsedCollections): void {
    const collections = actualCollections.map(collection => {
        const result = lambda(db, collection);
        if (result === true) {
            return collection;
        }
        else if (result) {
            return { ...result, name: collection } as OptionedExportedIndipendentCollection;
        }
    });

    for (const collection of collections) {
        if (typeof collection === 'string') {
            parseIndipendentCollectionsString(rootOptions, db, collection, actualCollections, parsed);
        }
        else {
            parseIndipendentCollectionsObject(rootOptions, db, collection, actualCollections, parsed);
        }
    }
}

export async function parseIndipendentCollection(rootOptions: ExportingOptions, db: string, collection: ExportedIndipendentCollection, parsed: ParsedCollections, dbSchema: DatabaseSchemaCache): Promise<void> {
    const actualCollections: string[] = await dbSchema.getCollections(db);

    if (typeof collection === 'string') {
        parseIndipendentCollectionsString(rootOptions, db, collection, actualCollections, parsed);
    }
    else if (collection instanceof RegExp) {
        parseIndipendentCollectionsRegExp(rootOptions, db, collection, actualCollections, parsed);
    }
    else if (instanceOfLambdaExportedIndipendentCollection(collection)) {
        parseIndipendentCollectionsLambda(rootOptions, db, collection, actualCollections, parsed);
    }
    else {
        parseIndipendentCollectionsObject(rootOptions, db, collection, actualCollections, parsed);
    }
}

export async function parseIndipendentCollections(rootOptions: ExportingOptions, collections: ExportedIndipendentCollections, parsed: ParsedCollections, dbSchema: DatabaseSchemaCache): Promise<void> {
    if (collections.length) {
        const databases = await dbSchema.getDatabases();

        for (const collection of collections) {
            for (const db of databases) {
                await parseIndipendentCollection(rootOptions, db, collection, parsed, dbSchema);
            }
        }
    }
}