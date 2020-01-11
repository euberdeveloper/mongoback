import { exec } from 'shelljs';

import { DetailedExportSchema, ExportingCollection } from '../../interfaces/result';
import { Options } from '../../interfaces/options';
import { CommandResult } from '../../interfaces/exportCollections';
import { ExportingError } from '../../errors';

import { Logger } from '../logger';
import { getCommand } from './getCommand';
import { getPath } from './getPath';
import { ExportResultCode } from '../../interfaces/result';

function addExported(exportedCollections: DetailedExportSchema, db: string, collection: ExportingCollection): void {
    if (exportedCollections[db]) {
        exportedCollections[db].push(collection);
    }
    else {
        exportedCollections[db] = [collection];
    }
}

async function execAsync(command: string): Promise<CommandResult> {
    return new Promise<CommandResult>((resolve, _reject) => {
        exec(command, { silent: true }, (code, stdout, stderr) => {
            resolve({ code, stdout, stderr });
        });
    });
}

async function exportCollection(db: string, collection: ExportingCollection, options: Options, exportedCollections: DetailedExportSchema, logger: Logger): Promise<boolean> {
    let total: boolean;
    
    const outPath = getPath(db, collection, options);
    const command = getCommand(db, collection, options, outPath);
    logger.printCommand(command);
    logger.exportingCollectionStart(db, collection.name);
    const commandResult = await execAsync(command);
    const success = (commandResult.code === 0);
    logger.exportingCollectionStop(db, collection.name, success);
    logger.printMongoexport(commandResult.stderr, success);

    if (success) {
        total = true;
        addExported(exportedCollections, db, collection);
    }
    else {
        total = false;
        const exportingError = new ExportingError(null, db, collection.name, command, commandResult.stderr);
        if (options.warnIfOneFails) {
            logger.warn(`MongoBack: error in exporting collection ${collection.name} of db ${db}`, commandResult.stderr);
        }
        if (options.throwIfOneFails) {
            throw exportingError;
        }
    }

    return total;
}

async function exportDatabase(db: string, collections: ExportingCollection[], options: Options, exportedCollections: DetailedExportSchema, logger: Logger): Promise<boolean> {
    let total = true;

    logger.exportingDatabase(db);
    for (const collection of collections) {
        total = await exportCollection(db, collection, options, exportedCollections, logger) ? total : false;
    }

    return total;
}

export async function exportCollections(schema: DetailedExportSchema, options: Options, logger: Logger): Promise<{ exportedCollections: DetailedExportSchema, code: ExportResultCode }> {
    const exportedCollections: DetailedExportSchema = {};
    let code = ExportResultCode.TOTAL;

    for (const db in schema) {
        code = await exportDatabase(db, schema[db], options, exportedCollections, logger) ? code : ExportResultCode.PARTIAL;
    }

    return { exportedCollections, code };
}