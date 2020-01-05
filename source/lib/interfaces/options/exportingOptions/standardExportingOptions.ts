/**
 * The exporting options reguarding the mongoexport command.
 * 
 * Most of the properties are exactly the same of the mongoexport options. Some are 
 * slightly modified to allow a more confortable usage, without changing what will
 * be passed as a mongoexport option. The default value of the option does not corrispond
 * with the mongoexport one. When there is a value set to false or undefined, it means that
 * the option is not added to the mongoexport command, not that it is the default value of
 * mongoexport.
 * 
 * To support the old versions of mongoexport, there are also the deprecated options.
 * 
 * See the mongoexport official documentation to further information.
 * 
 * @see {@link https://docs.mongodb.com/manual/reference/program/mongoexport/} to further
 * information on the mongoexport options.
 */
export interface StandardExportingOptions {
    /**
     * Runs mongoexport in a quiet mode that attempts to limit the amount of output.
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
     * Specifies the file type to export. Specify csv for CSV format or json for JSON format.
     * If you specify csv, then you must also use either the --fields or the 
     * --fieldFile option to declare the fields to export from the collection.
     * 
     * Default: undefined
     */
    type?: 'json' | 'csv';
    /**
     * Modifies the output to use either canonical or relaxed mode of the MongoDB 
     * Extended JSON (v2) format.
     * 
     * Default: undefined;
     */
    jsonFormat?: 'realaxed' | 'canonical';
    /**
     * Modifies the output of mongoexport to write the entire contents of the export 
     * as a single JSON array. By default mongoexport writes data using one JSON 
     * document for every MongoDB document.
     * 
     * Default: false
     */
    jsonArray?: boolean;
    /**
     * Outputs documents in a pretty-printed format JSON.
     * 
     * Default: false
     */
    pretty?: boolean;
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
    /**
     * Specifies a field or fields to include in the export. Use a comma 
     * separated list of fields to specify multiple fields. If any of your field 
     * names include white space, use quotation marks to enclose the field list. 
     * For example, if you wished to export two fields, phone and user number, you 
     * would specify --fields "phone,user number". For csv output formats, 
     * mongoexport includes only the specified field(s), and the specified 
     * field(s) can be a field within a sub-document. For JSON output formats, 
     * mongoexport includes only the specified field(s) and the _id field, and 
     * if the specified field(s) is a field within a sub-document, the mongoexport 
     * includes the sub-document with all its fields, not just the specified field 
     * within the document.
     * 
     * You can pass either a string ora an array of strings. The fields are automatically
     * included in quotes to support whitespaces.
     * 
     * Default: undefined
     */
    fields?: string | string[];
    /**
     * An alternative to --fields. The --fieldFile option allows you to specify 
     * in a file the field or fields to include in the export and is only valid 
     * with the --type option with value csv. The file must have only one field
     * per line, and the line(s) must end with the LF character (0x0A).
     * 
     * Default: undefined
     */
    fieldFile?: string;
    /**
     * By default, mongoexport includes the exported field names as the first 
     * line in a CSV output. --noHeaderLine directs mongoexport to export the 
     * data without the list of field names. --noHeaderLine is only valid with 
     * the --type option with value csv.
     * 
     * Default: false
     */
    noHeaderLine?: boolean;
    /**
     * Use --skip to control where mongoexport begins exporting documents. 
     * See skip() for information about the underlying operation.
     * 
     * Default: undefined
     */
    skip?: number;
    /**
     * Specifies a maximum number of documents to include in the export. 
     * See limit() for information about the underlying operation.
     * 
     * Default: undefined
     */
    limit?: number;
    /**
     * Specifies an ordering for exported results. If an index does 
     * not exist that can support the sort operation, the results 
     * must be less than 32 megabytes.
     * 
     * You can pass either a string ora an array of strings. The fields are automatically
     * included in quotes to support whitespaces
     * 
     * Default: undefined
     */
    sort?: string | any;
    /**
     * Forces mongoexport to scan the data store directly instead of traversing the
     * _id field index. Use --forceTableScan to skip the index.
     * 
     * Default: false
     */
    forceTableScan?: boolean;
}