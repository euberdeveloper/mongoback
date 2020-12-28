import { ExportingCollection } from '@/interfaces/result';
import { ConnectionOptions, ExportingOptions } from '@/interfaces/options';

function parseUri(options: ConnectionOptions, db: string): string {
    let result = '';

    if (options.uri) {
        const lastSlash = options.uri.lastIndexOf('/');
        const protocolSlash = options.uri.indexOf('//') + 1;
        const dbSlash = lastSlash > protocolSlash ? lastSlash : -1;
        if (dbSlash === -1) {
            result = ` --uri=${options.uri}/${db}`;
        } else {
            const pre = options.uri.slice(0, dbSlash);
            const optionsIndex = options.uri.indexOf('?');
            const post = optionsIndex === -1 ? '' : options.uri.slice(optionsIndex);
            result = ` --uri=${pre}/${db}${post}`;
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
function parsePort(options: ConnectionOptions): string {
    return options.port ? ` --port=${options.port}` : '';
}
function parseUsername(options: ConnectionOptions): string {
    return options.username ? ` --username=${options.username}` : '';
}
function parsePassword(options: ConnectionOptions): string {
    return options.password ? ` --password=${options.password}` : '';
}
function parseSslCAFile(options: ConnectionOptions): string {
    return options.sslCAFile ? ` --sslCAFile=${options.sslCAFile}` : '';
}
function parseSslPEMKeyFile(options: ConnectionOptions): string {
    return options.sslPEMKeyFile ? ` --sslPEMKeyFile=${options.sslPEMKeyFile}` : '';
}
function parseSslPEMKeyPassword(options: ConnectionOptions): string {
    return options.sslPEMKeyPassword ? ` --sslPEMKeyPassword=${options.sslPEMKeyPassword}` : '';
}
function parseSslCRLFile(options: ConnectionOptions): string {
    return options.sslCRLFile ? ` --sslCRLFile=${options.sslCRLFile}` : '';
}
function parseAuthenticationDatabase(options: ConnectionOptions): string {
    return options.authenticationDatabase ? ` --authenticationDatabase=${options.authenticationDatabase}` : '';
}
function parseAuthenticationMechanism(options: ConnectionOptions): string {
    return options.authenticationMechanism ? ` --authenticationMechanism=${options.authenticationMechanism}` : '';
}
function parseGssapiServiceName(options: ConnectionOptions): string {
    return options.gssapiServiceName ? ` --gssapiServiceName=${options.gssapiServiceName}` : '';
}
function parseGssapiHostName(options: ConnectionOptions): string {
    return options.gssapiHostName ? ` --gssapiHostName=${options.gssapiHostName}` : '';
}
function parseReadPreference(options: ConnectionOptions): string {
    let result = '';

    if (options.readPreference) {
        if (typeof options.readPreference === 'string') {
            result = ` --readPreference=${options.readPreference}`;
        } else {
            result = ` --readPreference='${JSON.stringify(options.readPreference)}'`;
        }
    }

    return result;
}
function parseDbPath(options: ConnectionOptions): string {
    return options.dbpath ? ` --dbpath=${options.dbpath}` : '';
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
function parseFieldFile(options: ExportingOptions): string {
    return options.fieldFile ? ` --fieldFile=${options.fieldFile}` : '';
}
function parseQuery(options: ExportingOptions): string {
    let result = '';

    if (options.query) {
        if (typeof options.query === 'string') {
            result = ` --query='${options.query}'`;
        } else {
            result = ` --query='${JSON.stringify(options.query)}'`;
        }
    }

    return result;
}
function parseType(options: ExportingOptions): string {
    return options.type ? ` --type=${options.type}` : '';
}
function parseJsonFormat(options: ExportingOptions): string {
    return options.jsonFormat ? ` --jsonFormat=${options.jsonFormat}` : '';
}
function parseSkip(options: ExportingOptions): string {
    return options.skip ? ` --skip=${options.skip}` : '';
}
function parseLimit(options: ExportingOptions): string {
    return options.limit ? ` --limit=${options.limit}` : '';
}
function parseSort(options: ExportingOptions): string {
    let result = '';

    if (options.sort) {
        if (typeof options.sort === 'string') {
            result = ` --sort='${options.sort}'`;
        } else {
            result = ` --sort='${JSON.stringify(options.sort)}'`;
        }
    }

    return result;
}

export function getCommand(
    database: string,
    parsedCollection: ExportingCollection,
    options: ConnectionOptions,
    outPath: string
): string {
    const db = options.uri ? '' : ` --db=${database}`;
    const collection = ` --collection=${parsedCollection.name}`;

    const uri = parseUri(options, database);
    const host = parseHost(options);
    const port = parsePort(options);
    const username = parseUsername(options);
    const password = parsePassword(options);

    const ssl = options.ssl ? ' --ssl' : '';
    const sslCAFile = parseSslCAFile(options);
    const sslPEMKeyFile = parseSslPEMKeyFile(options);
    const sslPEMKeyPassword = parseSslPEMKeyPassword(options);
    const sslCRLFile = parseSslCRLFile(options);
    const sslAllowInvalidCertificates = options.sslAllowInvalidCertificates ? ' --sslAllowInvalidCertificates' : '';
    const sslAllowInvalidHostnames = options.sslAllowInvalidHostnames ? ' --sslAllowInvalidHostnames' : '';
    const sslFIPSMode = options.sslFIPSMode ? ' --sslFIPSMode' : '';
    const authenticationDatabase = parseAuthenticationDatabase(options);
    const authenticationMechanism = parseAuthenticationMechanism(options);
    const gssapiServiceName = parseGssapiServiceName(options);
    const gssapiHostName = parseGssapiHostName(options);
    const readPreference = parseReadPreference(options);
    const ipv6 = options.ipv6 ? ' --ipv6' : '';
    const slaveOk = options.slaveOk ? ' --slaveOk' : '';
    const directoryperdb = options.directoryperdb ? ' --directoryperdb' : '';
    const dbpath = parseDbPath(options);

    const verbose = parseVerbose(parsedCollection);
    const quiet = parsedCollection.quiet ? ' --quiet' : '';
    const fields = parseFields(parsedCollection);
    const fieldFile = parseFieldFile(parsedCollection);
    const query = parseQuery(parsedCollection);
    const type = parseType(parsedCollection);
    const jsonFormat = parseJsonFormat(parsedCollection);
    const jsonArray = parsedCollection.jsonArray ? ' --jsonArray' : '';
    const pretty = parsedCollection.pretty ? ' --pretty' : '';
    const noHeaderLine = parsedCollection.noHeaderLine ? ' --noHeaderLine' : '';
    const forceTableScan = parsedCollection.forceTableScan ? ' --forceTableScan' : '';
    const skip = parseSkip(parsedCollection);
    const limit = parseLimit(parsedCollection);
    const sort = parseSort(parsedCollection);

    const out = ` --out=${outPath}`;

    let command = `mongoexport${uri}${host}${port}${username}${password}${db}${collection}${ssl}${sslCAFile}${sslPEMKeyFile}${sslPEMKeyPassword}${sslCRLFile}${sslAllowInvalidCertificates}${sslAllowInvalidHostnames}${sslFIPSMode}${authenticationMechanism}${gssapiServiceName}${gssapiHostName}${authenticationDatabase}${readPreference}${verbose}${quiet}${ipv6}${fields}${fieldFile}${query}${type}${jsonFormat}${jsonArray}${pretty}${noHeaderLine}${slaveOk}${dbpath}${directoryperdb}${forceTableScan}${skip}${limit}${sort}${out}`;
    return command;
}
