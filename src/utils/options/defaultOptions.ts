import { ConnectionOptions, ExportingOptions, ExportedOptions, OutOptions, Options, OutType, ExportingType } from '../../interfaces/options';

const DEFAULT_CONNECTION_OPTIONS: ConnectionOptions = {
    uri: undefined,
    host: 'localhost',
    port: 27017,
    username: undefined,
    password: undefined,
    authenticationDatabase: undefined,
    replicaSetName: undefined,
    connectionOptions: undefined,
    srv: false,
    ssl: false,
    sslCAFile: undefined,
    sslPEMKeyFile: undefined,
    sslPEMKeyPassword: undefined,
    sslCRLFile: undefined,
    sslAllowInvalidCertificates: false,
    sslAllowInvalidHostnames: false,
    authenticationMechanism: undefined,
    gssapiServiceName: undefined,
    gssapiHostName: undefined,
    slaveOk: false,
    readPreference: undefined,
    dbpath: undefined,
    directoryperdb: false,
    journal: false,
    ipv6: false
};

const DEFAULT_EXPORTING_OPTIONS: ExportingOptions = {
    quiet: false,
    verbose: false,
    type: ExportingType.JSON,
    jsonFormat: undefined,
    jsonArray: false,
    pretty: false,
    query: undefined,
    fields: undefined,
    fieldFile: undefined,
    noHeaderLine: false,
    skip: undefined,
    limit: undefined,
    sort: undefined,
    prependDbName: false,
    fileName: undefined,
    filePath: undefined,
    absolutePath: false
};

const DEFAULT_COLLECTIONS_OPTIONS: ExportedOptions = {
    all: false,
    databases: [],
    collections: []
};

const DEFAULT_OUT_OPTIONS: OutOptions = {
    outDir: './exported',
    outType: OutType.DEEP
};

export const DEFAULT_OPTIONS: Options = { 
    ...DEFAULT_CONNECTION_OPTIONS, 
    ...DEFAULT_EXPORTING_OPTIONS, 
    ...DEFAULT_COLLECTIONS_OPTIONS, 
    ...DEFAULT_OUT_OPTIONS 
};