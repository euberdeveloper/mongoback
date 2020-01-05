export * from './databasesOptions';
export * from './collectionsOptions';

import { Databases } from './databasesOptions';
import { Collections } from './collectionsOptions';

/**
 * The exported options interface.
 * It contains the options about what should be exported and what
 * to do if it is not exported correctly.
 */
export interface ExportedOptions {
    /**
     * If all the collections of every database will be exported.
     * 
     * Default: true
     */
    all?: boolean;
    /**
     * The databases that will be exported. All the collections of a database 
     * will be exported. Eventual exporting options passed to this option will
     * overwrite the default ones.
     * 
     * Default: []
     */
    databases?: Databases;
    /**
     * The collections that will be exported. Eventual exporting options passed to 
     * this option will overwrite the default ones and the ones in the "database" option.
     * 
     * Default: []
     */
    collections?: Collections;
    /**
     * If also system collections will be exported.
     * 
     * Default: false
     */
    systemCollections?: boolean;
    /**
     * If for permissions causes there is an error while listing databases or collections of
     * the MongoDB, an error will be thrown. If the value is false, the databases and collections
     * that cannot be listed will be ignored and not be exported. 
     * 
     * NB: Actually all the errors that happen while listing databases or collections, not only
     * the permission ones, will be thrown.
     * 
     * Default: false 
     */
    throwIfLackOfPermissions?: boolean;
    /**
     * If for permissions causes there is an error while listing databases or collections of
     * the MongoDB, a warning message will be logged.
     * 
     * NB: Actually all the errors that happen while listing databases or collections, not only
     * the permission ones, will be warned.
     * 
     * Default: false 
     */
    warnIfLackOfPermissions?: boolean;
    /**
     * If the mongoexport of a collection fails, an error will be thrown. If the 
     * value is false, the result of the function will have code PARTIAL(= 1), specifying
     * that not all the expected collections were exported.
     * 
     * Default: false 
     */
    throwIfOneFails?: boolean;
    /**
     * If the mongoexport of a collection fails, a warning will be logged.
     * 
     * Default: false 
     */
    warnIfOneFails?: boolean;
}