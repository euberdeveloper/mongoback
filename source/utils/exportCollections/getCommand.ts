import { ExportingCollection } from '@/interfaces/result';
import { ConnectionOptions, ExportingOptions, Options } from '@/interfaces/options';

function parseGenericBoolean(options: ConnectionOptions | ExportingOptions, param: string): string {
    return options[param] ? ` --${param}` : '';
}
function parseGenericString(options: ConnectionOptions | ExportingOptions, param: string): string {
    const value: string = options[param];
    return value ? ` --${param}=${value}` : '';
}
function parseGenericJsonString(
    options: ConnectionOptions | ExportingOptions,
    param: string,
    useApixes: boolean
): string {
    let result = '';

    if (options[param]) {
        if (typeof options[param] === 'string') {
            const value: string = options[param];
            const stringValue = useApixes ? `'${value}'` : value;
            result = ` --${param}=${stringValue}`;
        } else {
            result = ` --${param}='${JSON.stringify(options[param])}'`;
        }
    }

    return result;
}
function parseUri(options: ConnectionOptions, db: string): string {
    let result = '';

    if (options.uri) {
        const lastSlash = options.uri.split('?')[0].lastIndexOf('/');
        const protocolSlash = options.uri.indexOf('//') + 1;
        const dbSlash = lastSlash > protocolSlash ? lastSlash : -1;
        if (dbSlash === -1) {
            result = ` --uri="${options.uri}/${db}"`;
        } else {
            const pre = options.uri.slice(0, dbSlash);
            const optionsIndex = options.uri.indexOf('?');
            const post = optionsIndex === -1 ? '' : options.uri.slice(optionsIndex);
            result = ` --uri="${pre}/${db}${post}"`;
        }
    }

    return result;
}
function parseHost(options: ConnectionOptions): string {
    let result = '';

    if (options.host) {
        if (typeof options.host === 'string') {
            result = ` --host=${options.host}`;
        } else {
            const hosts = options.host.map(h => `${h.host}:${h.port}`).join(',');
            result = ` --host=${options.replicaSetName ?? ''}/${hosts}`;
        }
    }

    return result;
}
function parseVerbose(options: ExportingOptions): string {
    let result = '';

    if (options.verbose) {
        if (typeof options.verbose === 'number') {
            if (options.verbose > 0) {
                options.verbose = options.verbose <= 5 ? options.verbose : 5;
                for (let i = 0; i < options.verbose; i++) {
                    result += 'v';
                }
                result = ' -' + result;
            }
        } else {
            result = ' --verbose';
        }
    }

    return result;
}
function parseFields(options: ExportingOptions): string {
    let result = '';

    if (options.fields) {
        if (typeof options.fields === 'string') {
            result = ` --fields="${options.fields}"`;
        } else if (options.fields.length) {
            result = ` --fields="${options.fields.join(',')}"`;
        }
    }

    return result;
}

export function getCommand(
    database: string,
    parsedCollection: ExportingCollection,
    options: Options,
    outPath: string
): string {
    const method = options.method ?? 'mongoexport';

    const db = options.uri ? '' : ` --db=${database}`;
    const collection = ` --collection=${parsedCollection.name}`;

    const uri = parseUri(options, database);
    const host = parseHost(options);
    const port = parseGenericString(options, 'port');
    const username = parseGenericString(options, 'username');
    const password = parseGenericString(options, 'password');

    const ssl = parseGenericBoolean(options, 'ssl');
    const sslCAFile = parseGenericString(options, 'sslCAFile');
    const sslPEMKeyFile = parseGenericString(options, 'sslPEMKeyFile');
    const sslPEMKeyPassword = parseGenericString(options, 'sslPEMKeyPassword');
    const sslCRLFile = parseGenericString(options, 'sslCRLFile');
    const sslAllowInvalidCertificates = parseGenericBoolean(options, 'sslAllowInvalidCertificates');
    const sslAllowInvalidHostnames = parseGenericBoolean(options, 'sslAllowInvalidHostnames');
    const sslFIPSMode = parseGenericBoolean(options, 'sslFIPSMode');
    const authenticationDatabase = parseGenericString(options, 'authenticationDatabase');
    const authenticationMechanism = parseGenericString(options, 'authenticationMechanism');
    const gssapiServiceName = parseGenericString(options, 'gssapiServiceName');
    const gssapiHostName = parseGenericString(options, 'gssapiHostName');
    const awsSessionToken = parseGenericString(options, 'awsSessionToken');
    const readPreference = parseGenericJsonString(options, 'readPreference', false);
    const ipv6 = parseGenericBoolean(options, 'ipv6');
    const slaveOk = parseGenericBoolean(options, 'slaveOk');
    const directoryperdb = parseGenericBoolean(options, 'directoryperdb');
    const dbpath = parseGenericString(options, 'dbpath');

    const verbose = parseVerbose(parsedCollection);
    const quiet = parseGenericBoolean(parsedCollection, 'quiet');
    const fields = parseFields(parsedCollection);
    const fieldFile = parseGenericString(parsedCollection, 'fieldFile');
    const query = parseGenericJsonString(parsedCollection, 'query', true);
    const type = parseGenericString(parsedCollection, 'type');
    const jsonFormat = parseGenericString(parsedCollection, 'jsonFormat');
    const jsonArray = parseGenericBoolean(parsedCollection, 'jsonArray');
    const pretty = parseGenericBoolean(parsedCollection, 'pretty');
    const noHeaderLine = parseGenericBoolean(parsedCollection, 'noHeaderLine');
    const forceTableScan = parseGenericBoolean(parsedCollection, 'forceTableScan');
    const skip = parseGenericString(parsedCollection, 'skip');
    const limit = parseGenericString(parsedCollection, 'limit');
    const sort = parseGenericJsonString(parsedCollection, 'sort', true);

    const out = ` --out=${outPath}`;

    let command = `${
        method as string
    }${uri}${host}${port}${username}${password}${db}${collection}${ssl}${sslCAFile}${sslPEMKeyFile}${sslPEMKeyPassword}${sslCRLFile}${sslAllowInvalidCertificates}${sslAllowInvalidHostnames}${sslFIPSMode}${authenticationMechanism}${gssapiServiceName}${gssapiHostName}${awsSessionToken}${authenticationDatabase}${readPreference}${verbose}${quiet}${ipv6}${fields}${fieldFile}${query}${type}${jsonFormat}${jsonArray}${pretty}${noHeaderLine}${slaveOk}${dbpath}${directoryperdb}${forceTableScan}${skip}${limit}${sort}${out}`;
    return command;
}
