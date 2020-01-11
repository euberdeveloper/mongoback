import { ExportingOptions } from '../exportingOptions';

/**
 * A callback type whose instances can be in the "databases" option.
 * All the databases will be passed to this callback and if true or an 
 * [[ExportingOptions]] object with further options are returned, the database will 
 * be exported.
 * @param db The database token in consideration
 * @returns If true the database will be exported with default exporting options. If
 * an [[ExportingOptions]] object with further options the database will be exported with that options. 
 * If false, null or undefined the database will not be exported.
 */
export type LambdaDatabase = ((db: string) => (boolean | ExportingOptions));

/**
 * An object whose instances can be in the "databases" option.
 * The property "match" must be specified. If it is a string, all databases equals to
 * that string will be exported. If it is a RegExp, all databases matching that RegExp
 * will be exported. The other properties are the [[ExportingOptions]] exporting options 
 * that overwrite the default ones.
 */
export type DetailedDatabase = { 
    /**
     * The databases to export as a string or RegExp.
     */
    match: (string | RegExp) 
} & ExportingOptions;

/**
 * A type whose instances can be in the "databases" option.
 * It can be a string, a RegExp, an [[DetailedDatabase]] or a [[LambdaDatabase]].
 * If it is a string, all databases equals to that string will be exported. 
 * If it is a RegExp, all databases matching that RegExp will be exported.
 * If it is an [[DetailedDatabase]], all databases matching its "databases" property
 * will be exported with the object [[ExportingOptions]] overwriting the derault ones.
 * If it is a [[LambdaDatabase]], all databases that passed to that function return
 * a truthy value will be exported, with the eventual [[ExportingOptions]] returned 
 * overwriting the default ones.
 */
export type Database = string | RegExp | DetailedDatabase | LambdaDatabase;

/**
 * The type of the "databases" option. It is a [[GeneralDatabase]]
 * instance or an array of [[GeneralDatabase]] and all databases matching those instances
 * will be exported.
 */
export type Databases = Database | Database[];

/**
 * A function to determine if a [[Database]] instance is of type [[LambdaDatabase]]
 * @param obj The [[Database]] instance whose type will be checked.
 */
export function instanceOfLambdaDatabase(obj: Database): obj is LambdaDatabase {
    function isFunction(obj: any): boolean {
        return obj && {}.toString.call(obj) === '[object Function]';
    }

    return isFunction(obj);
}