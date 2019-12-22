import { Options } from "../../interfaces/options";
import { ParsedCollections } from "../../interfaces/parsedCollections";
import { purgeExportingOptions } from "./purgeExportingOptions";
import { divideExportedCollections } from "./parseCollection";
import { parseCollectionsWithDatabase } from "./parseCollectionsWithDatabase";
import { parseIndipendentCollections } from "./parseIndipendentCollections";
import { parseExportedDatabases } from "./parseExportedDatabases";
import { parseAll } from "./parseAll";

export async function getParsedCollections(options: Options): Promise<ParsedCollections> {
    const parsedCollections: ParsedCollections = {};

    const rootOptions = purgeExportingOptions(options);
    const { withDatabase, indipendent } = divideExportedCollections(options.collections);
    const exportedDatabases = options.databases;
    const all = options.all;

    await parseCollectionsWithDatabase(rootOptions, withDatabase, parsedCollections);
    await parseIndipendentCollections(rootOptions, indipendent, parsedCollections);
    await parseExportedDatabases(rootOptions, exportedDatabases, parsedCollections);
    await parseAll(rootOptions, all, parsedCollections);

    return parsedCollections;
}