import { StandardCommonExportingOptions } from './common';

/**
 * The exporting options regarding the mongodump commands.
 *
 * Most of the properties are exactly the same of the mongodump options. Some are
 * slightly modified to allow a more confortable usage, without changing what will
 * be passed as a mongodump option. The default value of the option does not corrispond
 * with the mongodump one. When there is a value set to false or undefined, it means that
 * the option is not added to the mongodump command, not that it is the default value of
 * mongodump.
 *
 * To support the old versions of mongodump, there are also the deprecated options.
 *
 * See the mongodump official documentation to further information.
 *
 * @see {@link https://www.mongodb.com/docs/database-tools} to further
 * information on the mongodump options.
 */
export interface StandardMongoDumpExportingOptions extends StandardCommonExportingOptions {
    /**
     * Specifies the path to a file containing a JSON document as a query filter
     *  that limits the documents included in the output of mongodump.
     *  --queryFile enables you to create query filters that are too large to
     *  fit in your terminal's buffer.
     *
     * Default: undefined
     */
    queryFile?: string;
    /**
     * Compresses the output. If mongodump outputs to the dump directory,
     *  the new feature compresses the individual files.
     *  The files have the suffix .gz.
     *
     * Default: false;
     */
    gzip?: boolean;
    /**
     * Modifies the output of mongodump to write the entire contents of the export
     * as a single JSON array. By default mongodump writes data using one JSON
     * document for every MongoDB document.
     *
     * Default: false
     */
    archive?: string;
    /**
     * Creates a file named oplog.bson as part of the mongodump output. The oplog.bson file,
     *  located in the top level of the output directory, contains oplog entries that occur
     *  during the mongodump operation. This file provides an effective point-in-time snapshot
     *  of the state of a mongod instance.
     *
     * Default: false
     */
    oplog?: boolean;
    /**
     * Includes user and role definitions in the database's dump directory
     *  when performing mongodump on a specific database. This option applies
     *  only when you specify a database in the --db option. MongoDB always
     *  includes user and role definitions when mongodump applies to an entire
     *  instance and not just a specific database.
     *
     * Default: false
     */
    dumpDbUsersAndRoles?: boolean;
    /**
     * Number of collections mongodump should export in parallel.
     *
     * Default: undefined (mongodump's default is 4)
     */
    numParallelCollections?: number;
    /**
     * When specified, mongodump exports read-only views as collections. For each view, mongodump
     *  will produce a BSON file containing the documents in the view. If you mongorestore the produced
     *  BSON file, the view will be restored as a collection.
     *
     * Default: false
     */
    viewsAsCollections?: boolean;
}
