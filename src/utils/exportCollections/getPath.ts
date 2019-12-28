import { join } from 'path';

import { ParsedCollection } from "../../interfaces/parsedCollections";
import { Options } from "../../interfaces/options";

export function getPath(db: string, collection: ParsedCollection, options: Options): string {
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