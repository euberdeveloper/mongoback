import { Options } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";

import { Database } from "../database";
import { DatabaseSchemaCache } from "../databaseSchemaCache";

import { purgeExportingOptions } from "./purgeExportingOptions";
import { divideExportedCollections } from "./parseCollection";
import { parseCollectionsWithDatabase } from "./parseCollectionsWithDatabase";
import { parseIndipendentCollections } from "./parseIndipendentCollections";
import { parseExportedDatabases } from "./parseExportedDatabases";
import { parseAll } from "./parseAll";

export async function getParsedCollections(options: Options, database: Database): Promise<ParsedCollections> {
    const parsedCollections: ParsedCollections = {};
    const dbSchema = new DatabaseSchemaCache(database);

    const rootOptions = purgeExportingOptions(options);
    const { withDatabase, indipendent } = divideExportedCollections(options.collections);
    const exportedDatabases = options.databases;
    const all = options.all;

    await parseCollectionsWithDatabase(rootOptions, withDatabase, parsedCollections, dbSchema);
    await parseIndipendentCollections(rootOptions, indipendent, parsedCollections, dbSchema);
    await parseExportedDatabases(rootOptions, exportedDatabases, parsedCollections, dbSchema);
    await parseAll(rootOptions, all, parsedCollections, dbSchema);

    return parsedCollections;
}