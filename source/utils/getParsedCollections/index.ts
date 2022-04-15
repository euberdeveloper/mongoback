import {
    MongoScanner,
    ScanOptions,
    MongoScannerError,
    MongoScannerListDatabasesError,
    MongoScannerListCollectionsError
} from 'mongo-scanner';

import { Options } from '@/interfaces/options';
import { ConnectionParameters } from '@/interfaces/connection';
import { ExportSchema, DetailedExportSchema } from '@/interfaces/result';
import { MongoBackDatabaseError } from '@/errors';

import { Logger } from '@/utils/logger';

import { purgeExportingOptions } from './purgeExportingOptions';
import { divideCollections } from './parseCollection';
import { parseSpecificCollections } from './parseSpecificCollections';
import { parseGeneralCollections } from './parseGeneralCollections';
import { parseDatabases } from './parseDatabases';
import { parseAll } from './parseAll';

function getWarnMessage(options: Options, logger: Logger) {
    return options.warnIfLackOfPermissions
        ? (db: string, error: MongoScannerListDatabasesError | MongoScannerListCollectionsError) => {
              let message =
                  error instanceof MongoScannerListCollectionsError
                      ? `MongoBack: cannot list collections of ${db}`
                      : 'MongoBack: cannot list databases';
              logger.warn(message, error);
          }
        : undefined;
}

export async function getParsedCollections(
    options: Options,
    dbParams: ConnectionParameters,
    logger: Logger
): Promise<DetailedExportSchema> {
    const result: DetailedExportSchema = {};
    const mongoScannerOptions: ScanOptions = {
        useCache: true,
        excludeSystem: !options.systemCollections,
        ignoreLackOfPermissions: !options.throwIfLackOfPermissions,
        onLackOfPermissions: getWarnMessage(options, logger)
    };
    const mongoScanner = new MongoScanner(dbParams.uri, dbParams.options, mongoScannerOptions);

    const rootOptions = purgeExportingOptions(options);
    const collections = Array.isArray(options.collections) ? options.collections : [options.collections];
    const { specific, general } = divideCollections(collections as any);
    const databases = Array.isArray(options.databases) ? options.databases : [options.databases];
    const all = options.all;

    try {
        await mongoScanner.startConnection();
        await parseSpecificCollections(rootOptions, specific, result, mongoScanner);
        await parseGeneralCollections(rootOptions, general, result, mongoScanner);
        await parseDatabases(rootOptions, databases as any, result, mongoScanner);
        await parseAll(rootOptions, all as any, result, mongoScanner);
        await mongoScanner.endConnection();
    } catch (error) {
        const error_ = error instanceof MongoScannerError ? new MongoBackDatabaseError(undefined, error) : error;
        throw error_;
    }

    return result;
}

export function removeSchemaDetails(detailedExportSchema: DetailedExportSchema): ExportSchema {
    const purged: ExportSchema = {};

    for (const db in detailedExportSchema) {
        const collections = detailedExportSchema[db].map(collection => collection.name);
        purged[db] = collections;
    }

    return purged;
}
