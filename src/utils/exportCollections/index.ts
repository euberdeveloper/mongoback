import { exec } from 'shelljs';

import { ParsedCollections, ParsedCollection } from "../../interfaces/parsedCollections";
import { Options } from "../../interfaces/options";
import { CommandResult } from '../../interfaces/exportCollections';
import { ExportingError } from '../../errors';

import { Logger } from '../logger';
import { getCommand } from './getCommand';
import { getPath } from './getPath';

function addExported(exportedCollections: ParsedCollections, db: string, collection: ParsedCollection): void {
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

async function exportCollection(db: string, collection: ParsedCollection, options: Options, exportedCollections: ParsedCollections, logger: Logger): Promise<void> {
    const outPath = getPath(db, collection, options);
    const command = getCommand(db, collection, options, outPath);
    logger.printCommand(command);
    logger.exportingCollectionStart(db, collection.name);
    const commandResult = await execAsync(command);
    const success = (commandResult.code === 0);
    logger.exportingCollectionStop(db, collection.name, success);
    logger.printMongoexport(commandResult.stderr, success);

    if (success) {
        addExported(exportedCollections, db, collection);
    }
    else {
        const exportingError = new ExportingError(null, db, collection.name, command, commandResult.stderr);
        if (options.warnIfOneFails) {
            logger.warn(`MongoBack: error in exporting collection ${collection.name} of db ${db}`, commandResult.stderr);
        }
        if (options.throwIfOneFails) {
            throw exportingError;
        }
    }
}

async function exportDatabase(db: string, collections: ParsedCollection[], options: Options, exportedCollections: ParsedCollections, logger: Logger): Promise<void> {
    logger.exportingDatabase(db);
    for (const collection of collections) {
        await exportCollection(db, collection, options, exportedCollections, logger);
    }
}

export async function exportCollections(parsedCollections: ParsedCollections, options: Options, logger: Logger): Promise<ParsedCollections> {
    const exportedCollections: ParsedCollections = {};
    
    for (const db in parsedCollections) {
        await exportDatabase(db, parsedCollections[db], options, exportedCollections, logger);
    }

    return exportedCollections;
}