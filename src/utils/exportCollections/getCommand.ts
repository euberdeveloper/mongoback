import { ParsedCollection } from "../../interfaces/parsedCollections";
import { Options, ExportingOptions } from "../../interfaces/options";

function parseSslCAFile(options: Options): string {
    return options.sslCAFile ? ` --sslCAFile=${options.sslCAFile}` : '';
}
function parseSslPEMKeyFile(options: Options): string {
    return options.sslPEMKeyFile ? ` --sslPEMKeyFile=${options.sslPEMKeyFile}` : '';
}
function parseSslPEMKeyPassword(options: Options): string {
    return options.sslPEMKeyPassword ? ` --sslPEMKeyPassword=${options.sslPEMKeyPassword}` : '';
}
function parseSslCRLFile(options: Options): string {
    return options.sslCRLFile ? ` --sslCRLFile=${options.sslCRLFile}` : '';
}
function parseAuthenticationDatabase(options: Options): string {
    return options.authenticationDatabase ? ` --authenticationDatabase=${options.authenticationDatabase}` : '';
}
function parseAuthenticationMechanism(options: Options): string {
    return options.authenticationMechanism ? ` --authenticationMechanism=${options.authenticationMechanism}` : '';
}
function parseGssapiServiceName(options: Options): string {
    return options.gssapiServiceName ? ` --gssapiServiceName=${options.gssapiServiceName}` : '';
}
function parseGssapiHostName(options: Options): string {
    return options.gssapiHostName ? ` --gssapiHostName=${options.gssapiHostName}` : '';
}
function parseReadPreference(options: Options): string {
    let result = '';

    if (options.readPreference) {
        if (typeof options.readPreference === 'string') {
            result = ` --readPreference=${options.readPreference}`;
        }
        else {
            result = ` --readPreference=${JSON.stringify(options.readPreference)}`;
        }
    }

    return result;
}

function parseVerbose(options: ExportingOptions): string {
    let result = '';

    if (options.verbose) {
        if (typeof options.verbose === 'number') {
            options.verbose = options.verbose <= 5 ? options.verbose : 5;
            for (let i = 0; i < options.verbose; i++) {
                result += 'v';
            }
            result = ' -' + result;
        }
        else {
            result = ' --verbose';
        }
    }

    return result;
}
function parseFields(options: ExportingOptions): string {
    let result = '';

    if (options.fields) {
        if (typeof options.fields === 'string') {
            result = ` --fields=${options.fields}`;
        }
        else if (options.fields.length) {
            result = ` --fields=${options.fields.join(',')}`;
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
            result = ` --query=${options.query}`;
        }
        else {
            result = ` --query=${JSON.stringify(options.query)}`;
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
            result = ` --sort=${options.sort}`;
        }
        else {
            result = ` --sort=${JSON.stringify(options.sort)}`;
        }
    }

    return result;
}

export function getCommand(database: string, parsedCollection: ParsedCollection, options: Options, outPath: string): string {
    const db = ` --db=${database}`;
    const collection = ` --collection=${parsedCollection.name}`;

    const host = ` --host=localhost`;
    const port = ` --port=27017`;

    const ssl = options.ssl ? ' --ssl' : '';
    const sslCAFile = parseSslCAFile(options);
    const sslPEMKeyFile = parseSslPEMKeyFile(options);
    const sslPEMKeyPassword = parseSslPEMKeyPassword(options);
    const sslCRLFile = parseSslCRLFile(options);
    const sslAllowInvalidCertificates = options.sslAllowInvalidCertificates ? ' --sslAllowInvalidCertificates' : '';
    const sslAllowInvalidHostnames = options.sslAllowInvalidHostnames ? ' --sslAllowInvalidHostnames' : '';
    const authenticationDatabase = parseAuthenticationDatabase(options);
    const authenticationMechanism = parseAuthenticationMechanism(options);
    const gssapiServiceName = parseGssapiServiceName(options);
    const gssapiHostName = parseGssapiHostName(options);
    const readPreference = parseReadPreference(options);

    const verbose = parseVerbose(parsedCollection);
    const quiet = options.quiet ? ' --quiet' : '';
    const ipv6 = options.ipv6 ? ' --ipv6' : '';
    const fields = parseFields(parsedCollection);
    const fieldFile = parseFieldFile(parsedCollection);
    const query = parseQuery(parsedCollection);
    const type = parseType(parsedCollection);
    const jsonFormat = parseJsonFormat(parsedCollection);
    const jsonArray = options.jsonArray ? ' --jsonArray' : '';
    const pretty = options.pretty ? ' --pretty' : '';
    const noHeaderLine = options.noHeaderLine ? ' --noHeaderLine' : '';
    const slaveOk = options.slaveOk ? ' --slaveOk' : '';
    const forceTableScan = options.forceTableScan ? ' --slaveOk' : '';
    const skip = parseSkip(parsedCollection);
    const limit = parseLimit(parsedCollection);
    const sort = parseSort(parsedCollection);

    const out = ` --out=${outPath}`;

    let command = `mongoexport${host}${port}${db}${collection}${ssl}${sslCAFile}${sslPEMKeyFile}${sslPEMKeyPassword}${sslCRLFile}${sslAllowInvalidCertificates}${sslAllowInvalidHostnames}${authenticationMechanism}${gssapiServiceName}${gssapiHostName}${authenticationDatabase}${readPreference}${verbose}${quiet}${ipv6}${fields}${fieldFile}${query}${type}${jsonFormat}${jsonArray}${pretty}${noHeaderLine}${slaveOk}${forceTableScan}${skip}${limit}${sort}${out}`;
    return command;
}