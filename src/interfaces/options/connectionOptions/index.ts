export enum AuthenticationMechanism {
    SCRAM_SHA_1 = 'SCRAM-SHA-1',
    SCRAM_SHA_256 = 'SCRAM-SHA-256',
    MONGODB_X509 = 'MONGODB-X509',
    GSSAPI = 'GSSAPI',
    PLAIN = 'PLAIN',
    MONGODB_CR = 'MONGODB-CR'
};

export interface ReplicaSet {
    host: string;
    port: number;
};

export interface ConnectionOptions {
    uri?: string;
    host?: string | ReplicaSet[];
    port?: number;
    username?: string;
    password?: string;
    authenticationDatabase?: string;
    authenticationMechanism?: AuthenticationMechanism;
    replicaSetName?: string;
    connectionOptions?: string | object;
    srv?: boolean;
    ssl?: boolean;
    sslCAFile?: string;
    sslPEMKeyFile?: string;
    sslPEMKeyPassword?: string;
    sslCRLFile?: string;
    sslFIPSMode?: boolean; // deprecated
    sslAllowInvalidCertificates?: boolean;
    sslAllowInvalidHostnames?: boolean;
    gssapiServiceName?: string;
    gssapiHostName?: string;
    slaveOk?: boolean; // deprecated
    readPreference?: string | any;
    journal?: boolean; // deprecated
    ipv6?: boolean; // deprecated
    dbpath?: string; // deprecated
    directoryperdb?: boolean; // deprecated
}