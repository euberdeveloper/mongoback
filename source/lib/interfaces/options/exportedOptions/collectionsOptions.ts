import { ExportingOptions } from '../exportingOptions';

/**
 * A callback type whose instances can be in the "collections" option.
 * All the databases and collections will be passed to this callback and if true or an 
 * [[ExportingOptions]] object with further options are returned, the collection will 
 * be exported.
 * @param db The database token in consideration
 * @param collections The collection token in consideration
 * @returns If true the collection will be exported with default exporting options. If
 * an [[ExportingOptions]] object with further options the collection will be exported with that options. 
 * If false, null or undefined the collection will not be exported.
 */
export type LambdaCollection = ((db: string, collection: string) => (boolean | ExportingOptions));

/**
 * An object whose instances can be in the "collections" option.
 * The property "collections" must be specified. If it is a string, all collections equals to
 * that string will be exported. If it is a RegExp, all collections matching that RegExp
 * will be exported. The other properties are the [[ExportingOptions]] exporting options 
 * that overwrite the default ones.
 */
export type DetailedCollection = { 
    /**
     * The collections to export as a string or RegExp.
     */
    collections: (string | RegExp) 
} & ExportingOptions;

/**
 * A type whose instances can be in the "collections" option.
 * It can be a string, a RegExp, an [[DetailedCollection]] or a [[LambdaCollection]].
 * If it is a string, all collections equals to that string will be exported. 
 * If it is a RegExp, all collections matching that RegExp will be exported.
 * If it is an [[DetailedCollection]], all collections matching its "collections" property
 * will be exported with the object [[ExportingOptions]] overwriting the derault ones.
 * If it is a [[LambdaCollection]], all collections that passed to that function return
 * a truthy value will be exported, with the eventual [[ExportingOptions]] returned 
 * overwriting the default ones.
 */
export type GeneralCollection = string | RegExp | DetailedCollection | LambdaCollection;

/**
 * A type that can be passed as value of the "collections" option. It is a [[GeneralCollection]]
 * instance or an array of [[GeneralCollection]] and all collections matching those instances
 * will be exported.
 */
export type GeneralCollections = GeneralCollection | GeneralCollection[];

/**
 * The type whose instances can be values of the [[SpecificCollections]] keys.
 * It is an object with a property "collections", which is an array of [[GeneralCollection]]
 * that defines which collections of the database will be exported. The other properties are
 * [[ExportingOptions]] that will overwrite the default ones for these collections.
 */
export type DetailedGeneralCollections = { 
    /**
     * The collections to export as an array of [[GeneralCollection]]
     */
    collections: GeneralCollection[] 
} & ExportingOptions; 

/**
 * A type whose instances can be in the "collections" option.
 * It is an object whose keys represents the database. Each database-key contains
 * a [[GeneralCollections]] or a [[DetailedGeneralCollections]] instance.
 * The [[GeneralCollections]] instances will export all the collections whose database
 * is the database-key and that match the instance.
 * The [[DetailedGeneralCollections]] is an object having an array of [[GeneralCollection]]
 * as "collections" property and additional [[ExportingOptions]] properties that overwrite
 * the default ones.
 */
export interface SpecificCollections {
    [db: string]: GeneralCollections | DetailedGeneralCollections;
}

/**
 * The type whose instance can be in the "collections" option.
 * It can be a [[SpecificCollections]] instance, that specifies collections in the 
 * scope of their database, or it can be a [[GeneralCollection]] instance, that specifies
 * collections without specifying their database.
 */
export type Collection = SpecificCollections | GeneralCollection;
/**
 * The type of the "collections" option. It defines the collections that will be exported.
 */
export type Collections = Collection | Collection[];

function isFunction(obj: any): boolean {
    return obj && {}.toString.call(obj) === '[object Function]';
}

/**
 * A function to determine if a [[GeneralCollection]] instance is of type [[LambdaCollection]]
 * @param obj The [[GeneralCollection]] instance whose type will be checked.
 */
export function instanceofLambdaCollection(obj: GeneralCollection): obj is LambdaCollection {
    return isFunction(obj);
}

/**
 * A function to determine if a [[Collection]] instance is of type [[GeneralCollection]]
 * @param obj The [[Collection]] instance whose type will be checked.
 */
export function instanceOfGeneralCollection(obj: Collection): obj is GeneralCollection {
    return (
        typeof obj === 'string'
        || obj instanceof RegExp
        || isFunction(obj)
        || (
            typeof obj === 'object'
            && 'collections' in obj
            && (
                typeof obj.collections === 'string'
                || obj.collections instanceof RegExp 
            )
        )
    );
}