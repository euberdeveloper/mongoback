import { ExportingOptions } from '@/interfaces/options';

const KEYS = new Set([
    'quiet',
    'verbose',
    'type',
    'jsonFormat',
    'jsonArray',
    'pretty',
    'query',
    'fields',
    'fieldFile',
    'noHeaderLine',
    'skip',
    'limit',
    'sort',
    'forceTableScan',
    'prependDbName',
    'fileName',
    'filePath',
    'absolutePath'
]);

export function purgeExportingOptions(obj: any): ExportingOptions {
    const purged = { ...obj };

    for (const key in purged) {
        if (!KEYS.has(key)) {
            delete purged[key];
        }
    }

    return purged;
}
