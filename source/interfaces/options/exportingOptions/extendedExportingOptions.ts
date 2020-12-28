/**
 * The function type that can be used as value of the "fileName" option.
 * @param db The database of the collection that will be exported
 * @param collection The the collection that will be exported
 * @param type The type of the collection that will be exported
 * @returns The file name of the exported collection
 */
export type ExportingFileName = string | ((db: string, collection: string, type: 'json' | 'csv') => string);
/**
 * The function type of that can be used as value of the "filePath" option.
 * @param db The database of the collection that will be exported
 * @param collection The the collection that will be exported
 * @param type The type of the collection that will be exported
 * @param outPath The file path of the exported collection if this function was not specified
 * @returns The file path of the exported collection
 */
export type ExportingFilePath =
    | string
    | ((db: string, collection: string, type: 'json' | 'csv', outPath: string) => string);

/**
 * Options that specify how will the options be exported and are not about the
 * mongoexport options.
 */
export interface ExtendedExportingOptions {
    /**
     * If the file name will be prepended by the database of the collection.
     * The format is: "database_filename.extension".
     *
     * When undefined, if the outType is 'deep' the file name is not prepended while
     * if the outType is 'flat' it is prepended
     *
     * Default: undefined
     */
    prependDbName?: boolean;
    /**
     * A string or a function returning the name of the file of the exported collection.
     *
     * Default: undefined
     */
    fileName?: ExportingFileName;
    /**
     * A string or a function returning the path of the file of the exported collection.
     *
     * Default: undefined
     */
    filePath?: ExportingFilePath;
    /**
     * If the filePath value is absolute and not relative to the outDir option.
     *
     * Default: false
     */
    absolutePath?: boolean;
}
