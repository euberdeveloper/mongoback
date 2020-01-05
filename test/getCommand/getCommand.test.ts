import { ExportingCollection, ConnectionOptions, AuthenticationMechanism } from '../../source/lib/index';
import { getCommand } from '../../source/lib/utils/exportCollections/getCommand';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';

export default function () {

    describe('Test: getCommand auxiliary function', function () {

        it(`Should return a simple command`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                uri: 'mongodb://localhost:27017'
            };
            const outPath = './exported';

            const expected = 'mongoexport --uri=mongodb://localhost:27017/cars --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a simple command but with different db from uri`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                uri: 'mongodb://localhost:27017/computers'
            };
            const outPath = './exported';

            const expected = 'mongoexport --uri=mongodb://localhost:27017/cars --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a simple command but with different db from uri and with options`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                uri: 'mongodb://localhost:27017/computers?connectTimeoutMS=300000'
            };
            const outPath = './exported';

            const expected = 'mongoexport --uri=mongodb://localhost:27017/cars?connectTimeoutMS=300000 --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with host and port`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with host (replicaset)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: [
                    {
                        host: 'localhost',
                        port: 27017
                    },
                    {
                        host: 'localhost',
                        port: 8080
                    },
                    {
                        host: 'euber',
                        port: 2323
                    }
                ],
                replicaSetName: 'replicas'
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=replicas/localhost:27017,localhost:8080,euber:2323 --db=cars --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with username and password`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                username: 'euber',
                password: 'burundu'
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --username=euber --password=burundu --db=cars --collection=Ferrari --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with ssl parameters`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                ssl: true,
                sslCAFile: 'path',
                sslCRLFile: 'path',
                sslPEMKeyFile: 'path',
                sslPEMKeyPassword: 'secret',
                sslAllowInvalidCertificates: true,
                sslAllowInvalidHostnames: true,
                sslFIPSMode: true
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --ssl --sslCAFile=path --sslPEMKeyFile=path --sslPEMKeyPassword=secret --sslCRLFile=path --sslAllowInvalidCertificates --sslAllowInvalidHostnames --sslFIPSMode --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with ssl parameters`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                ssl: true,
                sslCAFile: 'path',
                sslCRLFile: 'path',
                sslPEMKeyFile: 'path',
                sslPEMKeyPassword: 'secret',
                sslAllowInvalidCertificates: true,
                sslAllowInvalidHostnames: true,
                sslFIPSMode: true
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --ssl --sslCAFile=path --sslPEMKeyFile=path --sslPEMKeyPassword=secret --sslCRLFile=path --sslAllowInvalidCertificates --sslAllowInvalidHostnames --sslFIPSMode --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with authentication mechanism and database`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                authenticationMechanism: AuthenticationMechanism.MONGODB_X509,
                authenticationDatabase: 'administrator'
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --authenticationMechanism=MONGODB-X509 --authenticationDatabase=administrator --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with kerberos parameters`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                gssapiHostName: 'host',
                gssapiServiceName: 'service'
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --gssapiServiceName=service --gssapiHostName=host --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with readPreference (secondary)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                readPreference: 'secondary'
            };
            const outPath = './exported';

            const expected = 'mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --readPreference=secondary --out=./exported';
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with readPreference (object)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                readPreference: {mode: 'secondary', tagSets: [ { 'region': 'east' } ], maxStalenessSeconds: 120}
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --readPreference='{"mode":"secondary","tagSets":[{"region":"east"}],"maxStalenessSeconds":120}' --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (boolean)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: true
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --verbose --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (two v)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: 2
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari -vv --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (five v)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: 5
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari -vvvvv --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (sanitize more than five v)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: 6
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari -vvvvv --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (zero v case)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: 0
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with verbose (negative v case)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                verbose: -1
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with quiet and ipv6`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                quiet: true
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                ipv6: true
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --quiet --ipv6 --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with fields (string)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                fields: 'timestamp'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --fields="timestamp" --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with fields (array)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                fields: ['timestamp', 'mona', 'pota']
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --fields="timestamp,mona,pota" --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with fieldFile`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                fieldFile: 'file'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --fieldFile=file --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with limit and skip`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                limit: 23,
                skip: 23
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --skip=23 --limit=23 --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with query (string)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                query: `{"n":{"$gte":23}}`
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --query='{"n":{"$gte":23}}' --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with query (json)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                query: { n: { $gte: 23 } }
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --query='{"n":{"$gte":23}}' --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with type csv`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                type: 'csv'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --type=csv --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with jsonArray, pretty, noHeaderLine, slaveOk, forceTableScan`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                jsonArray: true,
                pretty: true,
                noHeaderLine: true,
                forceTableScan: true
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                slaveOk: true
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --jsonArray --pretty --noHeaderLine --slaveOk --forceTableScan --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with jsonFormat canonical`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                jsonFormat: 'canonical'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --jsonFormat=canonical --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with sort (string)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                sort: `{"timestamp":1}`
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --sort='{"timestamp":1}' --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with sort (json)`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari',
                sort: {'timestamp': 1}
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --sort='{"timestamp":1}' --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

        it(`Should return a command with dbpath and directoryperdb`, function () {

            const database = 'cars';
            const collection: ExportingCollection = {
                name: 'Ferrari'
            };
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                dbpath: 'path',
                directoryperdb: true
            };
            const outPath = './exported';

            const expected = `mongoexport --host=localhost --port=27017 --db=cars --collection=Ferrari --dbpath=path --directoryperdb --out=./exported`;
            const result = getCommand(database, collection, options, outPath);
            expect(result).to.equal(expected);

        });

    });

}