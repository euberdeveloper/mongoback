export type ExportingFileName = string | ((db: string, collection: string) => string);
export type ExportingFilePath = string | ((db: string, collection: string, outPath: string) => string);

export interface ExtendedExportingOptions {
    prependDbName?: boolean;
    fileName?: ExportingFileName;
    filePath?: ExportingFilePath;
    absolutePath?: boolean;
}