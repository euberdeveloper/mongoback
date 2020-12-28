/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
import { join } from 'path';

import { ExportingCollection } from '@/interfaces/result';
import { Options } from '@/interfaces/options';

export function getPath(db: string, collection: ExportingCollection, options: Options): string {
    let result = '';

    const outDir = options.outDir as string;

    const extension = collection.type ?? 'json';
    switch (options.outType) {
        case 'deep':
            result = join(outDir, db);
            break;
        case 'flat':
            result = join(outDir);
            break;
    }

    if (collection.filePath) {
        if (typeof collection.filePath === 'string') {
            result = collection.absolutePath ? join(collection.filePath) : join(outDir, collection.filePath);
        } else {
            const filePath = collection.filePath(db, collection.name, extension, outDir);
            if (collection.fileName) {
                let fileName = '';
                if (typeof collection.fileName === 'string') {
                    fileName = collection.fileName;
                } else {
                    fileName = collection.fileName(db, collection.name, extension);
                }
                result = collection.absolutePath ? join(filePath, fileName) : join(outDir, filePath, fileName);
            } else {
                result = collection.absolutePath ? join(filePath) : join(outDir, filePath);
            }
        }
    } else if (collection.fileName) {
        if (typeof collection.fileName === 'string') {
            result = join(result, collection.fileName);
        } else {
            const filename = collection.fileName(db, collection.name, extension);
            result = join(result, filename);
        }
    } else {
        if (collection.prependDbName || (options.outType === 'flat' && collection.prependDbName !== false)) {
            result = join(result, `${db}_${collection.name}`);
        } else {
            result = join(result, collection.name);
        }
        result += `.${extension}`;
    }

    return result;
}
