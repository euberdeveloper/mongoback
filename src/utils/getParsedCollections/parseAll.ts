import { ExportingOptions } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";

import { DatabaseSchemaCache } from "../databaseSchemaCache";
import { parseCollection } from "./parseCollection";

export async function parseAll(rootOptions: ExportingOptions, all: boolean, parsed: ParsedCollections, dbSchema: DatabaseSchemaCache): Promise<void> {
    if (all) {
        const databases = await dbSchema.getDatabases();

        for (const db of databases) {
            const collections = await dbSchema.getCollections(db);

            collections.forEach(collection => 
                parseCollection(rootOptions, db, collection, parsed)
            );
        }
    }
}