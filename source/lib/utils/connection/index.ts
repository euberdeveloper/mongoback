import { MongoClientOptions } from 'mongodb';

import { ConnectionOptions } from '../../interfaces/options';
import { ConnectionParameters } from '../../interfaces/connection';

async function getMongoConnectionOptions(options: ConnectionOptions): Promise<MongoClientOptions> {
    const result: MongoClientOptions = {};

    result.replicaSet = options.replicaSetName;
    result.authSource = options.authenticationDatabase;
    result.authMechanism = options.authenticationMechanism;
    result.ssl = options.ssl;
    /* (result as any).replicaSet = options.replicaSetName;
    (result as any).authSource = options.authenticationDatabase;
    (result as any).authMechanism = options.authenticationMechanism;
    (result as any).tls = options.ssl;
    (result as any).tlsCAFile = options.sslCAFile;
    (result as any).tlsCertificateKeyFile = options.sslPEMKeyFile;
    (result as any).tlsCertificateKeyFilePassword = options.sslPEMKeyPassword;
    (result as any).tlsAllowInvalidCertificates = options.sslAllowInvalidCertificates;
    (result as any).tlsAllowInvalidHostnames = options.sslAllowInvalidHostnames;
    (result as any).gssapiServiceName = options.gssapiServiceName; */

    return result;
}

function getMongoConnectionUri(options: ConnectionOptions): string {
    let uri = options.uri;

    if (!uri) {
        const protocol = options.srv ? 'mongodb+srv' : 'mongodb';
        const host = (Array.isArray(options.host)
            ? `${options.host.map(({host, port}) => `${host}:${port}`, '').join(',')}`
            : `${options.host}:${options.port}`);
        const auth = options.username
            ? (options.password
                ? `${options.username}:${options.password}@`
                : `${options.username}@`)
            : '';
        uri = `${protocol}://${auth}${host}`;
    }

    return uri;
}

export async function getMongoConnectionFromOptions(options: ConnectionOptions): Promise<ConnectionParameters> {
    return {
        uri: getMongoConnectionUri(options),
        options: await getMongoConnectionOptions(options)
    };
}