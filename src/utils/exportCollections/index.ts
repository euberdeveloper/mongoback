import { join } from 'path';
import { exec } from 'shelljs';

import { ParsedCollections, ParsedCollection } from "../../interfaces/parsedCollections";
import { Options } from "../../interfaces/options";
import { getCommand } from './getCommand';

interface CommandResult {
    code: number;
    stdout: string;
    stderr: string;
}

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
            const filePath = collection.filePath(db, collection.name, options.outDir);
            if (collection.fileName) {
                let fileName = '';
                if (typeof collection.fileName === 'string') {
                    fileName = collection.fileName;
                }
                else {
                    fileName = collection.fileName(db, collection.name);
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
            const filename = collection.fileName(db, collection.name);
            result = join(result, filename);
        }
    }
    else {
        if (collection.prependDbName) {
            result = join(result, `${db}_${collection.name}`);
        }
        else {
            result = join(result, collection.name);
        }
        result += `.${collection.type}`;
    }

    return result;
}

async function exportCollection(db: string, collection: ParsedCollection, options: Options): Promise<void> {
    const outPath = getPath(db, collection, options);
    const command = getCommand(db, collection, options, outPath);
    const result = await execAsync(command);
    console.log(result);
}

async function exportDatabase(db: string, collections: ParsedCollection[], options: Options): Promise<void> {
    for (const collection of collections) {
        await exportCollection(db, collection, options);
    }
}

export async function exportCollections(parsedCollections: ParsedCollections, options: Options): Promise<void> {
    for (const db in parsedCollections) {
        await exportDatabase(db, parsedCollections[db], options);
    }
}