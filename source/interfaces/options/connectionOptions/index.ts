/**
 * The enum of the possible authentication mechanisms of MongoDB.
 */
export enum AuthenticationMechanism {
    SCRAM_SHA_1 = 'SCRAM-SHA-1',
    SCRAM_SHA_256 = 'SCRAM-SHA-256',
    MONGODB_X509 = 'MONGODB-X509',
    MONGODB_AWS = 'MONGODB-AWS',
    GSSAPI = 'GSSAPI',
    PLAIN = 'PLAIN',
    /** @deprecated */
    MONGODB_CR = 'MONGODB-CR'
}

/**
 * The replica set interface of the MongoDB connection.
 */
export interface ReplicaSet {
    /**
     * The host name
     */
    host: string;
    /**
     * The port number
     */
    port: string | number;
}

/**
 * The MongoDB connection options. They will define both the options of the mongoexport
 * command and the uri/MongoClientOptions of the connection used to list databases and
 * collections.
 *
 * Most of the properties are exactly the same of the mongoexport options. Some are
 * slightly modified to allow a more confortable usage, without changing what will
 * be passed as a mongoexport option. The default value of the option does not corrispond
 * with the mongoexport one. When there is a value set to false or undefined, it means that
 * the option is not added to the mongoexport command, not that it is the default value of
 * mongoexport.
 *
 * To support the old versions of mongoexport, there are also the deprecated options.
 *
 * See the mongoexport official documentation to further information.
 *
 * @see {@link https://docs.mongodb.com/manual/reference/program/mongoexport/} to further
 * information on the mongoexport options.
 */
export interface ConnectionOptions {
    /**
     * The uri of the MongoDB connection.
     * If it is specified, the options
     * - host
     * - port
     * - password
     * - username
     * - srv
     * - authenticationMechanism
     * - authenticationDatabase
     * will be set to undefined and ignored.
     *
     * Default: undefined
     */
    uri?: string;
    /**
     * The host of the MongoDB connection.
     * It can be a string or an array of [[ReplicaSet]].
     *
     * The property differs from the mongoexport one in which also an
     * array of replica sets can be passed.
     *
     * Default: 'localhost'
     */
    host?: string | ReplicaSet[];
    /**
     * The port of the MongoDB connection.
     *
     * Default: 27017
     */
    port?: string | number;
    /**
     * The username of the MongoDB connection.
     *
     * Default: undefined
     */
    username?: string;
    /**
     * The password of the MongoDB connection.
     *
     * Default: undefined.
     */
    password?: string;
    /**
     * The authentication database of the MongoDB connection.
     *
     * Default: undefined
     */
    authenticationDatabase?: string;
    /**
     * The authentication mechanism of the MongoDB connection.
     *
     * Default: undefined
     */
    authenticationMechanism?: AuthenticationMechanism;
    /**
     * If the MongoDB connection uri is an srv.
     *
     * This property is not present in the mongoexport options, where
     * the "+srv" can be added manually in the host option.
     *
     * Default: false;
     */
    srv?: boolean;
    /**
     * The replicaSetName of the MongoDB connection.
     *
     * This property is not present in the mongoexport options, where
     * the replica set name is passed in the uri options or in the host option.
     *
     * Default: undefined
     */
    replicaSetName?: string;
    /**
     * If the MongoDB connection uses ssl or tls.
     *
     * Default: false
     */
    ssl?: boolean;
    /**
     * Specifies the .pem file that contains both the TLS/SSL certificate and key.
     *
     * Default: undefined
     */
    sslCAFile?: string;
    /**
     * Specify the file name of the .pem file using relative or absolute paths.
     *
     * Default: undefined
     */
    sslPEMKeyFile?: string;
    /**
     * Specifies the password to de-crypt the certificate-key file (i.e. --sslPEMKeyFile).
     * Use the --sslPEMKeyPassword option only if the certificate-key file is
     * encrypted. In all cases, the mongoexport will redact the password
     * from all logging and reporting output.
     *
     * Default: undefined
     */
    sslPEMKeyPassword?: string;
    /**
     * Specifies the .pem file that contains the Certificate Revocation List.
     * Specify the file name of the .pem file using relative or absolute paths.
     *
     * Default: undefined
     */
    sslCRLFile?: string;
    /**
     * Directs the mongoexport to use the FIPS mode of the installed OpenSSL library.
     * Your system must have a FIPS compliant OpenSSL library to use the
     * --sslFIPSMode option.
     *
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: false
     */
    sslFIPSMode?: boolean;
    /**
     * Bypasses the validation checks for server certificates and allows the
     * use of invalid certificates. When using the allowInvalidCertificates
     * setting, MongoDB logs as a warning the use of the invalid certificate.
     *
     * Default: false
     */
    sslAllowInvalidCertificates?: boolean;
    /**
     * Disables the validation of the hostnames in TLS/SSL certificates. Allows
     * mongoexport to connect to MongoDB instances even if the hostname in their
     * certificates do not match the specified hostname.
     *
     * Default: false
     */
    sslAllowInvalidHostnames?: boolean;
    /**
     * Specify the name of the service using GSSAPI/Kerberos. Only required
     * if the service does not use the default name of mongodb.
     *
     * Default: undefined
     */
    gssapiServiceName?: string;
    /**
     * Specify the hostname of a service using GSSAPI/Kerberos. Only required
     * if the hostname of a machine does not match the hostname resolved by DNS.
     *
     * Default: undefined
     */
    gssapiHostName?: string;
    /**
     * Sets the Read Preference to nearest, allowing mongoexport to read data
     * from secondary replica set members.
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: false
     */
    slaveOk?: boolean;
    /**
     * Specify the read preference for mongoexport.
     *
     * It can be a string such as 'primary' or 'secondary' or an object. If you want
     * to pass the json object as a string, you must manually include it in apixes.
     *
     * Default: undefined
     */
    readPreference?: string | any;
    /**
     * Allows mongoexport operations to access the durability journal to ensure that
     * the export is in a valid state. This option is only relevant when specifying
     * the --dbpath option.
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: false
     */
    journal?: boolean;
    /**
     * Enables IPv6 support that allows mongoexport to connect to the MongoDB
     * instance using an IPv6 network. All MongoDB programs and processes,
     * including mongoexport, disable IPv6 support by default.
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: false
     */
    ipv6?: boolean;
    /**
     * Specifies the directory of the MongoDB data files. If used, the --dbpath
     * option enables mongoexport to attach directly to local data files and insert
     *  the data without the mongod. To run with --dbpath, mongoexport needs to lock
     * access to the data directory: as a result, no mongod can access the same path
     * while the process runs.
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: undefined
     */
    dbpath?: string;
    /**
     * Use the --directoryperdb in conjunction with the corresponding option to
     * mongod, which allows mongoexport to export data from MongoDB instances
     * that have every database’s files saved in discrete directories on the
     * disk. This option is only relevant when specifying the --dbpath option.
     *
     * NB: Deprecated option of mongoexport
     * @deprecated
     *
     * Default: false
     */
    directoryperdb?: boolean;
}
