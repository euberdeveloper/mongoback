import { MongoScanner, ScanOptions, MongoScannerError, ListDatabasesError, ListCollectionsError } from 'mongo-scanner';

import { Options } from '../../interfaces/options';
import { ConnectionParameters } from '../../interfaces/connection';
import { ParsedCollections, CollectionsSchema, ParsedCollection } from '../../interfaces/parsedCollections';
import { DatabaseError } from '../../errors';

import { Logger } from '../logger';
import { purgeExportingOptions } from './purgeExportingOptions';
import { divideExportedCollections } from './parseCollection';
import { parseCollectionsWithDatabase } from './parseCollectionsWithDatabase';
import { parseIndipendentCollections } from './parseIndipendentCollections';
import { parseExportedDatabases } from './parseExportedDatabases';
import { parseAll } from './parseAll';

function getWarnMessage(options: Options, logger: Logger) {
    if (options.warnIfLackOfPermissions) {
        return (db: string, error: ListDatabasesError | ListCollectionsError) => {
            let message = error instanceof ListCollectionsError 
                ? `MongoBack: cannot list collections of ${db}`
                : 'MongoBack: cannot list databases';
            logger.warn(message, error);
        };
    }
    else {
        return undefined;
    }
}

export async function getParsedCollections(options: Options, dbParams: ConnectionParameters, logger: Logger): Promise<ParsedCollections> {
    const parsedCollections: ParsedCollections = {};
    const mongoScannerOptions: ScanOptions = {
        useCache: true, 
        excludeSystem: !options.systemCollections,
        ignoreLackOfPermissions: !options.throwIfLackOfPermissions,
        onLackOfPermissions: getWarnMessage(options, logger)
    };
    const mongoScanner = new MongoScanner(dbParams.uri, dbParams.options, mongoScannerOptions);

    const rootOptions = purgeExportingOptions(options);
    const { withDatabase, indipendent } = divideExportedCollections(options.collections as ParsedCollection[]);
    const exportedDatabases = options.databases;
    const all = options.all;

    try {
        await mongoScanner.startConnection();
        await parseCollectionsWithDatabase(rootOptions, withDatabase, parsedCollections, mongoScanner);
        await parseIndipendentCollections(rootOptions, indipendent, parsedCollections, mongoScanner);
        await parseExportedDatabases(rootOptions, exportedDatabases, parsedCollections, mongoScanner);
        await parseAll(rootOptions, all, parsedCollections, mongoScanner);
        await mongoScanner.endConnection();
    }
    catch (error) {
        if (error instanceof MongoScannerError) {
            throw new DatabaseError(null, error);
        }
        else {
            throw error;
        }
    }

    return parsedCollections;
}

export function purgeParsedCollections(parsedCollections: ParsedCollections): CollectionsSchema {
    const purged: CollectionsSchema = {};

    for (const db in parsedCollections) {
        const collections = parsedCollections[db].map(collection => collection.name);
        purged[db] = collections;
    }

    return purged;
}