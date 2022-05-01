/**
 * The exporting options regarding both mongoexport/mongodump commands.
 *
 * Most of the properties are exactly the same of the mongo-tool options. Some are
 * slightly modified to allow a more confortable usage, without changing what will
 * be passed as a mongo-tool option. The default value of the option does not corrispond
 * with the mongo-tool one. When there is a value set to false or undefined, it means that
 * the option is not added to the mongo-tool commands, not that it is the default value of
 * mongo-tool.
 *
 * To support the old versions of mongo-tool, there are also the deprecated options.
 *
 * See the mongo-tool official documentation to further information.
 *
 * @see {@link https://www.mongodb.com/docs/database-tools} to further
 * information on the mongoexport/mongodump options.
 */
export interface StandardCommonExportingOptions {
    /**
     * Runs the command in a quiet mode that attempts to limit the amount of output.
     *
     * Default: false
     */
    quiet?: boolean;
    /**
     * Increases the amount of internal reporting returned on standard output or in
     * log files. Increase the verbosity with the -v form by including the option
     * multiple times, (e.g. -vvvvv.)
     *
     * If the value is true, the option '--verbose' will be added. If it is a number,
     * it will be the number of v that will be put in the command. (e.g. 3 gives -vvv).
     *
     * Default: false
     */
    verbose?: boolean | number;
    /**
     * Provides a query as a JSON document (enclosed in quotes) to return matching
     * documents in the export. You must enclose the query document in single
     * quotes ('{ ... }') to ensure that it does not interact with your
     * shell environment. Starting in MongoDB 4.2, the query must be in
     * Extended JSON v2 format (either relaxed or canonical/strict mode),
     * including enclosing the field names and operators in quotes.
     *
     * You can pass the argument either as a string (it will automatically be included
     * in apixes) or as an object.
     *
     * Default: undefined
     */
    query?: string | any;
}
