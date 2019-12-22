// export interface ReplicaSet {
//     host: string;
//     port: number;
// };

// export interface ConnectionOptions {
//     uri?: string;
//     host?: string | ReplicaSet[];
//     port?: number;
//     username?: string;
//     password?: string;
//     authenticationDatabase?: string;
//     replicaSetName?: string;
//     connectionOptions?: string | object;
//     srv?: boolean;
//     ssl?: boolean;
//     sslCAFile?: string;
//     sslPEMKeyFile?: string;
//     sslPEMKeyPassword?: string;
//     sslCRLFile?: string;
//     sslFIPSMode?: boolean;
//     sslAllowInvalidCertificates?: boolean;
//     sslAllowInvalidHostnames?: boolean;
//     authenticationMechanism?: 'SCRAM-SHA-1' | 'SCRAM-SHA-256' | 'MONGODB-X509' | 'GSSAPI' | 'PLAIN' | 'MONGODB-CR';
//     gssapiServiceName?: string;
//     gssapiHostName?: string;
//     slaveOk?: boolean;
//     readPreference?: string | any;
//     dbpath?: string;
//     directoryperdb?: boolean;
//     journal?: boolean;
//     ipv6?: boolean;
// };

// export interface ExportingOptions {
//     quiet?: boolean;
//     verbose?: boolean | number;
//     type?: 'json' | 'csv';
//     jsonFormat?: 'canonical' | 'relaxed';
//     jsonArray?: boolean;
//     pretty?: boolean;
//     query?: string | any;
//     fields?: string[];
//     fieldFile?: string;
//     noHeaderLine?: boolean;
//     skip?: number;
//     limit?: number;
//     sort?: string | any;
//     forceTableScan?: boolean;
//     prependDbName?: boolean;
//     fileName?: string | ((db: string, collection: string) => string);
//     filePath?: string | ((db: string, collection: string, outPath: string) => string);
//     absolutePath?: boolean;
// };

// export type LambdaExportDatabase = ((db: string) => (boolean | ExportingOptions));
// export type OptionedExportDatabase = { name: (string | RegExp) } & ExportingOptions;
// export type ExportDatabase = string | RegExp | OptionedExportDatabase | LambdaExportDatabase;
// export type ExportDatabases = ExportDatabase[];

// export type LambdaExportIndipendentCollection = ((db: string, collection: string) => (boolean | ExportingOptions));
// export type OptionedExportIndipendentCollection = { name: (string | RegExp) } & ExportingOptions;
// export type ExportIndipendentCollection = string | RegExp | OptionedExportIndipendentCollection | LambdaExportIndipendentCollection;
// export type ExportIndipendentCollections = ExportIndipendentCollection[];
// export type ExportDatabaseCollections = ExportIndipendentCollections | (ExportingOptions & { collections: ExportIndipendentCollections });

// export interface ExportCollectionWithDatabase {
//     [db: string]: ExportDatabaseCollections;
// };
// export type ExportCollection = ExportCollectionWithDatabase | ExportIndipendentCollection;
// export type ExportCollections = ExportCollection[];

// export interface CollectionsOptions {
//     all?: boolean;
//     databases?: ExportDatabases;
//     collections?: ExportCollections;
// };

// export interface OutOptions {
//     outDir?: string;
//     outType?: 'deep' | 'flat';
// };

// export type Options = ConnectionOptions & CollectionsOptions & ExportingOptions & OutOptions;


// export interface ParsedCollections {
//     [db: string]: ({ name: string } & ExportingOptions)[];
// };

// function isFunction(obj: any): boolean {
//     return obj && {}.toString.call(obj) === '[object Function]';
// }

// export function instanceOfOptionedExportIndipendentCollection(obj: any): obj is OptionedExportIndipendentCollection {
//     const keys = [
//         'name',
//         'quiet',
//         'verbose',
//         'type',
//         'jsonFormat',
//         'jsonArray',
//         'pretty',
//         'query',
//         'fields',
//         'fieldFile',
//         'noHeaderLine',
//         'skip',
//         'limit',
//         'sort',
//         'forceTableScan',
//         'prependDbName',
//         'fileName',
//         'filePath',
//         'absolutePath'
//     ];
//     // Does not check types of keys but does not matter
//     return Object.keys(obj).every(key => key in keys);
// }

// export function instanceOfExportIndipendentCollection(obj: any): obj is ExportIndipendentCollection {
//     return (
//         typeof obj === 'string'
//         || obj instanceof RegExp
//         || instanceOfOptionedExportIndipendentCollection(obj)
//         || isFunction(obj) // Not precise but does not matter
//     );
// }

// export function instanceOfExportCollectionWithDatabase(obj: ExportCollection): obj is ExportCollectionWithDatabase {
//     return !instanceOfExportIndipendentCollection(obj);
// }

// export function instanceOfExportIndipendentCollections(obj: ExportDatabaseCollections): obj is ExportIndipendentCollections {
//     return obj && Array.isArray(obj);
// }

// export function purgeExportingOptions(obj: any): ExportingOptions {
//     const purged = obj;
//     const keys = [
//         'quiet',
//         'verbose',
//         'type',
//         'jsonFormat',
//         'jsonArray',
//         'pretty',
//         'query',
//         'fields',
//         'fieldFile',
//         'noHeaderLine',
//         'skip',
//         'limit',
//         'sort',
//         'forceTableScan',
//         'prependDbName',
//         'fileName',
//         'filePath',
//         'absolutePath'
//     ];
//     Object.keys(purged).forEach(key => (key in keys) || (delete purged[key]));
//     return purged;
// }

// const options: Options = {
//     databases: [ 
//         'DB_A', 
//         'DB_B', 
//         'DB_C', 
//         /.TEST./, 
//         db => db.indexOf('D') === -1, 
//         {
//             name: 'DB_D',
//             type: 'json',
//             pretty: true
//         },
//         {
//             name: 'DB_E',
//             type: 'csv',
//             fields: ['timestamp', 'power']
//         }
//     ]
// };