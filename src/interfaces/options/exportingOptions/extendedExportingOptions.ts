export type ExportingFileName = string | ((db: string, collection: string, type: 'json' | 'csv') => string);
export type ExportingFilePath = string | ((db: string, collection: string, type: 'json' | 'csv', outPath: string) => string);

export interface ExtendedExportingOptions {
    prependDbName?: boolean;
    fileName?: ExportingFileName;
    filePath?: ExportingFilePath;
    absolutePath?: boolean;
}