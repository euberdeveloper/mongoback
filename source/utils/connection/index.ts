import { MongoClientOptions } from 'mongodb';

import { ConnectionOptions } from '@/interfaces/options';
import { ConnectionParameters } from '@/interfaces/connection';

async function getMongoConnectionOptions(options: ConnectionOptions): Promise<MongoClientOptions> {
    const result: MongoClientOptions = {};

    if (options.replicaSetName) {
        result.replicaSet = options.replicaSetName;
    }
    if (options.ssl) {
        result.ssl = options.ssl;
    }
    if (options.sslCAFile) {
        result.tlsCAFile = options.sslCAFile;
    }
    if (options.sslAllowInvalidCertificates) {
        result.tlsAllowInvalidCertificates = options.sslAllowInvalidCertificates;
    }
    if (options.sslAllowInvalidHostnames) {
        result.tlsAllowInvalidHostnames = options.sslAllowInvalidHostnames;
    }
    if (options.sslPEMKeyPassword) {
        result.tlsCertificateKeyFilePassword = options.sslPEMKeyPassword;
    }
    if (options.sslPEMKeyFile) {
        result.tlsCertificateKeyFile = options.sslPEMKeyFile;
    }

    return result;
}

function getOptionsString(options: ConnectionOptions): string {
    const pairs: string[] = [];

    if (options.authenticationDatabase) {
        pairs.push(`authSource=${options.authenticationDatabase}`);
    }
    if (options.authenticationMechanism) {
        pairs.push(`authMechanism=${options.authenticationMechanism}`);
    }

    return pairs.length ? `/?${pairs.join('&')}` : '';
}

function getMongoConnectionUri(options: ConnectionOptions): string {
    let uri = options.uri;

    if (!uri) {
        const protocol = options.srv ? 'mongodb+srv' : 'mongodb';
        const host = Array.isArray(options.host)
            ? `${options.host.map(({ host, port }) => (options.srv ? `${host}:${port}` : host), '').join(',')}`
            : options.srv
            ? `${options.host ?? ''}:${options.port ?? ''}`
            : `${options.host ?? ''}`;
        const auth = options.username
            ? options.password
                ? `${options.username}:${options.password}@`
                : `${options.username}@`
            : '';
        const opt = getOptionsString(options);
        uri = `${protocol}://${auth}${host}${opt}`;
    }

    return uri;
}

export async function getMongoConnectionFromOptions(options: ConnectionOptions): Promise<ConnectionParameters> {
    return {
        uri: getMongoConnectionUri(options),
        options: await getMongoConnectionOptions(options)
    };
}
