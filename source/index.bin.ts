#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-misused-promises, @typescript-eslint/no-floating-promises */
import * as yargs from 'yargs';
import { Options } from '@/index';
import { mongoExportCli } from '@/utils/bin';

yargs
    .scriptName('mongoback')
    .command(
        'export',
        'Export your database with a powered mongoexport',
        () => {
            return {};
        },
        async argv => {
            const args: any = argv;
            const options: Options = {
                uri: args.uri,
                host: args.host,
                port: args.port,
                username: args.username,
                password: args.password,
                authenticationDatabase: args.authDatabase,
                authenticationMechanism: args.authMechanism,
                srv: args.srv,
                replicaSetName: args.replicaSetName,
                ssl: args.ssl,
                sslCAFile: args.sslCAFile,
                sslPEMKeyFile: args.sslPEMKeyFile,
                sslPEMKeyPassword: args.sslPEMKeyPassword,
                sslCRLFile: args.sslCRLFile,
                sslFIPSMode: args.sslFIPSMode,
                sslAllowInvalidCertificates: args.sslAllowInvalidCertificates,
                sslAllowInvalidHostnames: args.sslAllowInvalidHostnames,
                gssapiServiceName: args.gssapiServiceName,
                gssapiHostName: args.gssapiHostName,
                slaveOk: args.slaveOk,
                readPreference: args.readPreference,
                journal: args.journal,
                ipv6: args.ipv6,
                dbpath: args.dbpath,
                directoryperdb: args.directoryperdb,
                all: args.all,
                databases: args.databases,
                collections: args.collections,
                systemCollections: args.systemCollections,
                throwIfLackOfPermissions: args.throwIfLackOfPermissions,
                warnIfLackOfPermissions: args.warnIfLackOfPermissions,
                throwIfOneFails: args.throwIfOneFails,
                warnIfOneFails: args.warnIfOneFails,
                quiet: args.quiet,
                verbose: args.verbose,
                type: args.type,
                jsonFormat: args.jsonFormat,
                jsonArray: args.jsonArray,
                pretty: args.pretty,
                query: args.query,
                fields: args.fields,
                fieldFile: args.fieldFile,
                noHeaderLine: args.noHeaderLine,
                skip: args.skip,
                limit: args.limit,
                sort: args.sort,
                forceTableScan: args.forceTableScan,
                prependDbName: args.prependDbName,
                fileName: args.fileName,
                filePath: args.filePath,
                absolutePath: args.absolutePath,
                silent: args.silent,
                log: args.log,
                realtimeLog: args.realtimeLog,
                outDir: args.outDir,
                outType: args.outType
            };
            const askUri = args.askUri;
            const askCollections = args.askCollections;
            const askDestination = args.askDestination;
            await mongoExportCli(options, { askUri, askCollections, askDestination });
        }
    )
    .demandCommand(1, 'You must prompt the export command')
    .options({
        // Cli options
        askUri: {
            alias: 'u',
            default: undefined,
            defaultDescription: 'By default it is asked if the option --uri is not specified',
            describe:
                'If the connection uri will be asked to the user. If false, the uri deducted by the other options will be used.',
            type: 'boolean',
            group: 'Cli options'
        },
        askCollections: {
            alias: 'c',
            default: true,
            describe:
                'If the collections to be exported will be asked to the user. If false, the ones deducted by the other options will be used.',
            type: 'boolean',
            group: 'Cli options'
        },
        askDestination: {
            alias: 'd',
            default: true,
            describe:
                'If the outDir will be asked to the user. If false, the one deducted by the other options will be used.',
            type: 'boolean',
            group: 'Cli options'
        },
        // Main connection options
        uri: {
            default: undefined,
            describe:
                'The uri of the MongoDB connection. If it is specified, the other main connection options are ignored and (if not explicitly specified) the askUri will be set to false',
            type: 'string',
            group: 'Main connection options'
        },
        host: {
            default: 'localhost',
            describe: 'The host of the MongoDB connection.',
            type: 'string',
            group: 'Main connection options'
        },
        port: {
            default: 27_017,
            describe: 'The port of the MongoDB connection.',
            type: 'number',
            group: 'Main connection options'
        },
        username: {
            default: undefined,
            describe: 'The username of the MongoDB connection.',
            type: 'string',
            group: 'Main connection options'
        },
        password: {
            default: undefined,
            describe: 'The password of the MongoDB connection.',
            type: 'string',
            group: 'Main connection options'
        },
        authDatabase: {
            default: undefined,
            describe: 'The authentication database of the MongoDB connection.',
            type: 'string',
            group: 'Main connection options'
        },
        authMechanism: {
            default: undefined,
            describe: 'The authentication mechanism of the MongoDB connection.',
            type: 'string',
            group: 'Main connection options'
        },
        srv: {
            default: false,
            describe: 'If the MongoDB connection uri is an srv.',
            type: 'string',
            group: 'Main connection options'
        },
        // Advanced connection options
        replicaSetName: {
            default: undefined,
            describe: 'The replicaSetName of the MongoDB connection.',
            type: 'string',
            group: 'Advanced connection options'
        },
        ssl: {
            default: false,
            describe: 'If the MongoDB connection uses ssl or tls.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        sslCAFile: {
            default: undefined,
            describe: 'Specifies the .pem file that contains both the TLS/SSL certificate and key.',
            type: 'string',
            group: 'Advanced connection options'
        },
        sslPEMKeyFile: {
            default: undefined,
            describe: 'Specify the file name of the .pem file using relative or absolute paths.',
            type: 'string',
            group: 'Advanced connection options'
        },
        sslPEMKeyPassword: {
            default: undefined,
            describe: 'Specifies the password to de-crypt the certificate-key file (i.e. --sslPEMKeyFile).',
            type: 'string',
            group: 'Advanced connection options'
        },
        sslCRLFile: {
            default: undefined,
            describe: 'Specifies the .pem file that contains the Certificate Revocation List.',
            type: 'string',
            group: 'Advanced connection options'
        },
        sslFIPSMode: {
            default: false,
            describe:
                'Directs the mongoexport to use the FIPS mode of the installed OpenSSL library. Note: deprecated option of mongoexport.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        sslAllowInvalidCertificates: {
            default: false,
            describe:
                'Bypasses the validation checks for server certificates and allows the  use of invalid certificates.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        sslAllowInvalidHostnames: {
            default: false,
            describe: 'Disables the validation of the hostnames in TLS/SSL certificates.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        gssapiServiceName: {
            default: undefined,
            describe:
                'Specify the hostname of a service using GSSAPI/Kerberos. Only required if the hostname of a machine does not match the hostname resolved by DNS.',
            type: 'string',
            group: 'Advanced connection options'
        },
        gssapiHostName: {
            default: undefined,
            describe:
                'Specify the hostname of a service using GSSAPI/Kerberos. Only required  if the hostname of a machine does not match the hostname resolved by DNS.',
            type: 'string',
            group: 'Advanced connection options'
        },
        slaveOk: {
            default: false,
            describe:
                'Sets the Read Preference to nearest, allowing mongoexport to read data from secondary replica set members. Note: Deprecated option of mongoexport.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        readPreference: {
            default: undefined,
            describe:
                "Specify the read preference for mongoexport. It can be a string such as 'primary' or 'secondary' or an object (config file only). If you want to pass the json object as a string, you must manually include it in apixes.",
            type: 'string',
            group: 'Advanced connection options'
        },
        journal: {
            default: false,
            describe:
                'Allows mongoexport operations to access the durability journal to ensure that the export is in a valid state. Note: Deprecated option of mongoexport.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        ipv6: {
            default: false,
            describe:
                'Enables IPv6 support that allows mongoexport to connect to the MongoDB instance using an IPv6 network. Note: Deprecated on mongoexport.',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        dbpath: {
            default: undefined,
            describe: 'Specifies the directory of the MongoDB data files. Note: Deprecated on mongoexport',
            type: 'string',
            group: 'Advanced connection options'
        },
        directoryperdb: {
            default: false,
            describe:
                'Use the --directoryperdb in conjunction with the corresponding option mongod, which allows mongoexport to export data from MongoDB that have every database’s files saved in discrete directories on disk. Note: Deprecated on mongoexport',
            type: 'boolean',
            group: 'Advanced connection options'
        },
        // Exported options
        all: {
            default: false,
            describe: 'If all the collections of every database will be exported.',
            type: 'boolean',
            group: 'Exported options'
        },
        databases: {
            default: undefined,
            describe:
                'The databases that will be exported. All the collections of a database will be exported. Eventual exporting options passed to this option will overwrite the default ones. Note: on the cli, only strings are allowed.',
            type: 'string',
            group: 'Exported options'
        },
        collections: {
            default: [],
            describe:
                'The collections that will be exported. Eventual exporting options passed to this option will overwrite the default ones and the ones in the "database" option. Note: on the cli, only strings are allowed.',
            type: 'array',
            group: 'Exported options'
        },
        systemCollections: {
            default: false,
            describe: 'If also system collections will be exported.',
            type: 'boolean',
            group: 'Exported options'
        },
        throwIfLackOfPermissions: {
            default: false,
            describe:
                'If for permissions causes there is an error while listing databases or collections of the MongoDB, an error will be thrown. If the value is false, the databases and collections that cannot be listed will be ignored and not be exported. Note: Actually all the errors that happen while listing databases or collections, not only the permission ones, will be thrown.',
            type: 'boolean',
            group: 'Exported options'
        },
        warnIfLackOfPermissions: {
            default: false,
            describe:
                'If for permissions causes there is an error while listing databases or collections of the MongoDB, a warning message will be logged. NB: Actually all the errors that happen while listing databases or collections, not only the permission ones, will be warned.',
            type: 'boolean',
            group: 'Exported options'
        },
        throwIfOneFails: {
            default: false,
            describe:
                'If the mongoexport of a collection fails, an error will be thrown. If the  value is false, the result of the function will have code PARTIAL(= 1), specifying that not all the expected collections were exported.',
            type: 'boolean',
            group: 'Exported options'
        },
        warnIfOneFails: {
            default: false,
            describe: 'If the mongoexport of a collection fails, a warning will be logged.',
            type: 'boolean',
            group: 'Exported options'
        },
        // Exporting options
        quiet: {
            default: false,
            describe: 'Runs mongoexport in a quiet mode that attempts to limit the amount of output.',
            type: 'boolean',
            group: 'Exporting options'
        },
        verbose: {
            default: undefined,
            describe:
                'Increases the amount of internal reporting returned on standard output or in log files. Increase the verbosity with the -v form by including the option  multiple times, (e.g. -vvvvv.). Value from 1 to 5',
            type: 'number',
            group: 'Exporting options'
        },
        type: {
            default: undefined,
            choices: ['json', 'csv'],
            describe:
                'Specifies the file type to export. Specify csv for CSV format or json for JSON format. If you specify csv, then you must also use either the --fields or the  --fieldFile option to declare the fields to export from the collection.',
            type: 'string',
            group: 'Exporting options'
        },
        jsonFormat: {
            default: undefined,
            choices: ['canonical', 'relaxed'],
            describe:
                'Modifies the output to use either canonical or relaxed mode of the MongoDB Extended JSON (v2) format.',
            type: 'string',
            group: 'Exporting options'
        },
        jsonArray: {
            default: false,
            describe:
                'Modifies the output of mongoexport to write the entire contents of the export  as a single JSON array. By default mongoexport writes data using one JSON document for every MongoDB document.',
            type: 'boolean',
            group: 'Exporting options'
        },
        pretty: {
            default: false,
            describe: 'Outputs documents in a pretty-printed format JSON.',
            type: 'boolean',
            group: 'Exporting options'
        },
        query: {
            default: undefined,
            describe:
                "Provides a query as a JSON document (enclosed in quotes) to return matching documents in the export. You must enclose the query document in single  quotes ('{ ... }') to ensure that it does not interact with your shell environment. Starting in MongoDB 4.2, the query must be in  Extended JSON v2 format (either relaxed or canonical/strict mode), including enclosing the field names and operators in quotes. You can pass the argument either as a string (it will automatically be included in apixes) or as an object (only from config file).",
            type: 'string',
            group: 'Exporting options'
        },
        fields: {
            default: [],
            describe: 'Specifies a field or fields to include in the export.',
            type: 'array',
            coerce: value => (value?.length ? value : undefined),
            group: 'Exporting options'
        },
        fieldFile: {
            default: undefined,
            describe:
                'An alternative to --fields. The --fieldFile option allows you to specify  in a file the field or fields to include in the export and is only valid  with the --type option with value csv. The file must have only one field per line, and the line(s) must end with the LF character (0x0A).',
            type: 'string',
            group: 'Exporting options'
        },
        noHeaderLine: {
            default: false,
            describe: 'By default, mongoexport includes the exported field names as the first line in a CSV output.',
            type: 'boolean',
            group: 'Exporting options'
        },
        skip: {
            default: undefined,
            describe: 'Use --skip to control where mongoexport begins exporting documents.',
            type: 'number',
            group: 'Exporting options'
        },
        limit: {
            default: undefined,
            describe: 'Specifies a maximum number of documents to include in the export.',
            type: 'number',
            group: 'Exporting options'
        },
        sort: {
            default: undefined,
            describe:
                'You can pass the argument either as a string (it will automatically be included in apixes) or as an object (only config file).',
            type: 'string',
            group: 'Exporting options'
        },
        forceTableScan: {
            default: false,
            describe: 'Forces mongoexport to scan the data store directly instead of traversing the _id field index.',
            type: 'boolean',
            group: 'Exporting options'
        },
        prependDbName: {
            default: undefined,
            describe:
                'If the file name will be prepended by the database of the collection. The format is: "database_filename.extension".',
            type: 'boolean',
            group: 'Exporting options'
        },
        fileName: {
            default: undefined,
            describe: 'A string which is the name of the file of the exported collection.',
            type: 'string',
            group: 'Exporting options'
        },
        filePath: {
            default: undefined,
            describe: 'A string which is the path of the file of the exported collection.',
            type: 'string',
            group: 'Exporting options'
        },
        absolutePath: {
            default: false,
            describe: 'If the filePath value is absolute and not relative to the outDir option.',
            type: 'boolean',
            group: 'Exporting options'
        },
        // Log options
        silent: {
            default: false,
            describe: 'If nothing will be logged.',
            type: 'boolean',
            group: 'Log options'
        },
        log: {
            default: ['base'],
            choices: ['base', 'command', 'mongoexport', 'expectedCollections', 'actualCollections'],
            describe: 'The log modes. If there is more than a mode, they must be specified in an array.',
            type: 'array',
            group: 'Log options'
        },
        realtimeLog: {
            default: false,
            describe: 'If the mongoexport logs should be shown during the exporting operations or not',
            type: 'boolean',
            group: 'Log options'
        },
        // Out options
        outDir: {
            default: './exported',
            describe: 'The path were the exported collections will be saved.',
            type: 'string',
            group: 'Out options'
        },
        outType: {
            default: 'deep',
            choices: ['deep', 'flat'],
            describe: 'The type of the saving location.',
            type: 'string',
            group: 'Out options'
        },
        // Config file
        options: {
            alias: 'o',
            describe:
                'A path to a json config file. If an option is both on the file and in the command, the command one will be considered',
            config: true,
            configParser: (path: string) => require(path)
        }
    })
    .epilogue('For more information, find our manual at https://github.com/euberdeveloper/mongoback#readme').argv;
