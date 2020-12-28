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
            ? `${options.host.map(({ host, port }) => `${host}:${port}`, '').join(',')}`
            : `${options.host ?? ''}:${options.port ?? ''}`;
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
