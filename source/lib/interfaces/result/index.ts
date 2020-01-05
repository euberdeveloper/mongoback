import { ExportingOptions } from '../options';

/**
 * An interface that represents MongoDB collections with their database.
 * The keys are the databases and the values of those keys is an array of all the
 * collections of that database.
 * It contains only the name of the collections and not exporting informations.
 */
export interface ExportSchema {
    [database: string]: string[];
}

/**
 * A type representing a collection to be exported.
 * The name property is the string name of the collection, the other properties
 * are the [[ExportingOptions]] of the collection.
 */
export type ExportingCollection = ({ name: string } & ExportingOptions);
/**
 * An interface that represents MongoDB collections with their database.
 * The keys are the databases and the values of those keys is an array of all the
 * collections of that database.
 * It contains also the exporting informations of each collection. Indeed, every array is
 * an array of objects whose property "name" is the name of the collection and the other
 * properties are [[ExportingOptions]]
 */
export interface DetailedExportSchema {
    [database: string]: ExportingCollection[];
}

/**
 * The enum of the result of the mongoExport function.
 * The values are:
 * - TOTAL: All the collections expected to be exported were correctly exported
 * - PARTIAL: Not all the collections expected to be exported were correctly exported
 */
export enum ExportResultCode 
{ 
    /** 0 - All the collections expected to be exported were correctly exported */
    TOTAL = 0, 
    /** 1 - Not all the collections expected to be exported were correctly exported */
    PARTIAL = 1 
}

/**
 * The interface of the result of the mongoExport function
 */
export interface ExportResult {
    /**
     * The result code of the function. 
     * TOTAL (0 - all collections exported correctly)
     * PARTIAL (1 - not all collections exported correctly) 
     */
    code: ExportResultCode;
    /**
     * The collections expected to be exported. This result is obtained parsing the 
     * [[ExportedOptions]] and listing databases and collections of MongoDB.
     * It can be detailed (each collection with its ExportingOptions) if the option
     * "detailedResult" specify that.
     */
    expected: ExportSchema | DetailedExportSchema;
    /**
     * The collections correctly exported. This result is obtained parsing the 
     * [[ExportedOptions]] and listing databases and collections of MongoDB.
     * It can be detailed (each collection with its ExportingOptions) if the option
     * "detailedResult" specify that.
     */
    actual: ExportSchema | DetailedExportSchema;
}