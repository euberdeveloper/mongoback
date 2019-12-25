import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { MongoClientOptions } from "mongodb";

import { ConnectionOptions } from "../../interfaces/options";
import { ConnectionParameters } from '../../interfaces/connection';

const readFileAsync = promisify(readFile);

async function getMongoConnectionOptions(options: ConnectionOptions): Promise<MongoClientOptions> {
    const result: MongoClientOptions = {};

    if (options.username) {
        result.auth = {
            user: options.username,
            password: options.password
        };
    }
    if (options.sslCAFile) {
        result.sslCA = await readFileAsync(join(process.cwd(), options.sslCAFile)) as any;
    }
    if (options.sslCRLFile) {
        result.sslCRL = await readFileAsync(join(process.cwd(), options.sslCRLFile)) as any;
    }
    if (options.sslPEMKeyFile) {
        result.sslKey = await readFileAsync(join(process.cwd(), options.sslPEMKeyFile));
    }
    if (options.sslPEMKeyPassword) {
        result.sslPass = await readFileAsync(join(process.cwd(), options.sslPEMKeyFile));
    }
    result.replicaSet = options.replicaSetName;
    result.ssl = options.ssl;
    result.authMechanism = options.authenticationMechanism;

    return result;
}

function getMongoConnectionUri(options: ConnectionOptions): string {
    let uri = options.uri;

    if (!uri) {
        const protocol = options.srv ? 'mongodb+srv' : 'mongodb';
        const host = (Array.isArray(options.host)
            ? `${options.host.map(({host, port}) => `${host}:${port}`, '').join(',')}`
            : `${options.host}:${options.port}`);
        uri = `${protocol}://${host}`;
    }

    return uri;
}

export async function getMongoConnectionFromOptions(options: ConnectionOptions): Promise<ConnectionParameters> {
    return {
        uri: getMongoConnectionUri(options),
        options: await getMongoConnectionOptions(options)
    };
}