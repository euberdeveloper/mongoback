import { join } from 'path';
import { exec } from 'shelljs';

import { ParsedCollections, ParsedCollection } from "../../interfaces/parsedCollections";
import { Options } from "../../interfaces/options";
import { CommandResult } from '../../interfaces/exportCollections';

import { Logger } from '../logger';
import { getCommand } from './getCommand';

async function execAsync(command: string): Promise<CommandResult> {
    return new Promise<CommandResult>((resolve, _reject) => {
        exec(command, { silent: true }, (code, stdout, stderr) => {
            resolve({ code, stdout, stderr });
        })
    });
}

function getPath(db: string, collection: ParsedCollection, options: Options): string {
    let result = '';

    switch (options.outType) {
        case "deep":
            result = join(options.outDir, db);
            break;
        case "flat":
            result = join(options.outDir);
            break;
    }

    if (collection.filePath) {
        if (typeof collection.filePath === 'string') {
            result = collection.absolutePath ? join(collection.filePath) : join(options.outDir, collection.filePath);
        }
        else {
            const filePath = collection.filePath(db, collection.name, collection.type, options.outDir);
            if (collection.fileName) {
                let fileName = '';
                if (typeof collection.fileName === 'string') {
                    fileName = collection.fileName;
                }
                else {
                    fileName = collection.fileName(db, collection.name, collection.type);
                }
                result = collection.absolutePath ? join(filePath, fileName) : join(options.outDir, filePath, fileName);
            }
            else {
                result = collection.absolutePath ? join(filePath) : join(options.outDir, filePath);
            }
        }
    }
    else if(collection.fileName) {
        if (typeof collection.fileName === 'string') {
            result = join(result, collection.fileName);
        }
        else {
            const filename = collection.fileName(db, collection.name, collection.type);
            result = join(result, filename);
        }
    }
    else {
        if (collection.prependDbName || (options.outType === 'flat' && collection.prependDbName !== false)) {
            result = join(result, `${db}_${collection.name}`);
        }
        else {
            result = join(result, collection.name);
        }
        result += `.${collection.type}`;
    }

    return result;
}

async function exportCollection(db: string, collection: ParsedCollection, options: Options, logger: Logger): Promise<void> {
    const outPath = getPath(db, collection, options);
    const command = getCommand(db, collection, options, outPath);
    logger.printCommand(command);
    logger.exportingCollectionStart(db, collection.name);
    const commandResult = await execAsync(command);
    const success = (commandResult.code === 0);
    logger.exportingCollectionStop(db, collection.name, success);
    logger.printMongoexport(commandResult.stderr, success);
}

async function exportDatabase(db: string, collections: ParsedCollection[], options: Options, logger: Logger): Promise<void> {
    logger.exportingDatabase(db);
    for (const collection of collections) {
        await exportCollection(db, collection, options, logger);
    }
}

export async function exportCollections(parsedCollections: ParsedCollections, options: Options, logger: Logger): Promise<void> {
    for (const db in parsedCollections) {
        await exportDatabase(db, parsedCollections[db], options, logger);
    }
}