/**
 * The options about the output location and the result of the function
 */
export interface OutOptions {
    /**
     * The path were the exported collections will be saved.
     *
     * Default: './exported'
     */
    outDir?: string;
    /**
     * The type of the saving location.
     * It can be:
     * 'deep': A folder will be created for each database. Each folder contains the
     * exported collections of that database with the collection name as file name
     * 'flat': No folder will be created for each database. A file whose name is the
     * exported collection name prepended by its database name (if prependDBName is not false)
     * will be created for each exported collection
     *
     * Default: 'deep'
     */
    outType?: 'deep' | 'flat';
    /**
     * If the result will contain also the exporting options of the expected/actual collections.
     *
     * Default: false
     */
    detailedResult?: boolean;
}
