import { ExportingOptions } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";
import { parseCollection } from "./parseCollection";
import * as database from '../database';

export async function parseAll(rootOptions: ExportingOptions, all: boolean, parsed: ParsedCollections): Promise<void> {
    if (all) {
        const databases = await database.listDatabases();

        for (const db of databases) {
            const collections = await database.listCollections(db);

            collections.forEach(collection => 
                parseCollection(rootOptions, db, collection, parsed)
            );
        }
    }
}