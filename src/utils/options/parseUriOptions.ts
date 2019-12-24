import { Options } from '../../interfaces/options';

function percentEncode(str: string): string {
    return str
        .replace(/@/g, '%40')
        .replace(/:/g, '%3A')
        .replace(/\//g, '%2F')
        .replace(/%/g, '%25');
}

function toObjectConnectionOptions(connectionOptions: string): object {
    return connectionOptions
        .split('&')
        .map(str => str.split('='))
        .reduce((acc, curr) => acc = {...acc, [curr[0]]: curr[1] }, {});
}

function toStringConnectionOptions(connectionOptions: object): string {
    return Object.keys(connectionOptions)
        .map(key => `${key}=${connectionOptions[key]}`)
        .join('&');
}

function updateConnectionOptionsFromOptions(connectionOptions: object, options: Options): void {
    if (options.ssl && !connectionOptions['ssl']) {
        connectionOptions['ssl'] = options.ssl;
    }
    if (options.sslCAFile && !connectionOptions['tlsCAFile']) {
        connectionOptions['tlsCAFile'] = options.sslCAFile;
    }
    if (options.sslPEMKeyFile && !connectionOptions['tlsCertificateKeyFile']) {
        connectionOptions['tlsCertificateKeyFile'] = options.sslPEMKeyFile;
    }
    if (options.sslPEMKeyPassword && !connectionOptions['tlsCertificateKeyFilePassword']) {
        connectionOptions['tlsCertificateKeyFilePassword'] = options.sslPEMKeyPassword;
    }
    if (options.sslAllowInvalidCertificates && !connectionOptions['tlsAllowInvalidCertificates']) {
        connectionOptions['tlsAllowInvalidCertificates'] = options.sslAllowInvalidCertificates;
    }
    if (options.sslAllowInvalidHostnames && !connectionOptions['tlsAllowInvalidHostnames']) {
        connectionOptions['tlsAllowInvalidHostnames'] = options.sslAllowInvalidHostnames;
    }
    if (options.replicaSetName && !connectionOptions['replicaSet']) {
        connectionOptions['replicaSet'] = options.replicaSetName;
    }
    if (options.authenticationMechanism && !connectionOptions['authMechanism']) {
        connectionOptions['authMechanism'] = options.authenticationMechanism;
    }
    if (options.gssapiServiceName && !connectionOptions['gssapiServiceName']) {
        connectionOptions['gssapiServiceName'] = options.gssapiServiceName;
    }
    if (options.gssapiHostName && !connectionOptions['gssapiServiceName']) {
        connectionOptions['gssapiServiceName'] = options.gssapiHostName;
    }
    if (options.readPreference && !connectionOptions['readPreference']) {
        connectionOptions['readPreference'] = (typeof options.readPreference === 'string'
            ? options.readPreference
            : JSON.stringify(options.readPreference));
    }
    if (options.journal && !connectionOptions['journal']) {
        connectionOptions['journal'] = options.journal;
    }
}

function parseConnectionOptions(options: Options): string {
    let connectionOptions: object;

    if (!options.connectionOptions) {
        connectionOptions = {};
    }
    else if (typeof options.connectionOptions === 'string') {
        connectionOptions = toObjectConnectionOptions(options.connectionOptions);
    }
    else if (typeof options.connectionOptions === 'object') {
        connectionOptions = options.connectionOptions;
    }
    else {
        connectionOptions = {};
    }

    updateConnectionOptionsFromOptions(connectionOptions, options);

    const stringConnectionOptions = toStringConnectionOptions(connectionOptions);
    const stringResultOptions = (options.authenticationDatabase
        ? `?${stringConnectionOptions}`
        : `/?${stringConnectionOptions}`);

    return (stringConnectionOptions ? stringResultOptions : '');
}

export function getUriFromOptions(options: Options): string {
    const srvString = (options.srv ? '+srv' : '');
    const passwordString = (options.password
        ? `:${percentEncode(options.password)}`
        : '');
    const authString = (options.username
        ? `${options.username}${passwordString}@`
        : '');
    const hostString = (Array.isArray(options.host)
        ? `${options.host.map(({host, port}) => `${host}:${port}`, '').join(',')}`
        : `${options.host}:${options.port}`);
    const dbString = (options.authenticationDatabase
        ? `/${options.authenticationDatabase}`
        : '');
    const optionsString = parseConnectionOptions(options);
    return (options.uri ? options.uri : `mongodb${srvString}://${authString}${hostString}${dbString}${optionsString}`);
}