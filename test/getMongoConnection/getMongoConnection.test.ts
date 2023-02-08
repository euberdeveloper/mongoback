import { ConnectionOptions, AuthenticationMechanism } from '@/index';
import { getMongoConnectionFromOptions } from '@/utils/connection';

import { expect } from 'chai';

export default function (): void {
    describe('Test: getMongoConnectionFromOptions auxiliary function', function () {
        it(`Should return a simple uri`, async function () {
            const options: ConnectionOptions = {
                uri: 'mongodb://localhost:27017'
            };

            const expected = 'mongodb://localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a simple uri with host and port`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017
            };

            const expected = 'mongodb://localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a simple uri with host replicaset`, async function () {
            const options: ConnectionOptions = {
                host: [
                    {
                        host: 'localhost',
                        port: 27_017
                    },
                    {
                        host: 'localhost',
                        port: 8080
                    },
                    {
                        host: 'euber',
                        port: 2323
                    }
                ]
            };

            const expected = 'mongodb://localhost:27017,localhost:8080,euber:2323';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with username`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                username: 'euber'
            };

            const expected = 'mongodb://euber@localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with username and password`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                username: 'euber',
                password: 'secret'
            };

            const expected = 'mongodb://euber:secret@localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with srv`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                srv: true
            };

            const expected = 'mongodb+srv://localhost';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with srv, correct even with specified port`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                srv: true
            };

            const expected = 'mongodb+srv://localhost';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with authentication database`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                authenticationDatabase: 'users'
            };

            const expected = 'mongodb://localhost:27017/?authSource=users';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with authentication mechanism`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                authenticationMechanism: AuthenticationMechanism.PLAIN
            };

            const expected = 'mongodb://localhost:27017/?authMechanism=PLAIN';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with authentication database`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                authenticationDatabase: 'users'
            };

            const expected = 'mongodb://localhost:27017/?authSource=users';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri with both authentication database and mechanism`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                authenticationDatabase: 'users',
                authenticationMechanism: AuthenticationMechanism.PLAIN
            };

            const expected = 'mongodb://localhost:27017/?authSource=users&authMechanism=PLAIN';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
        });

        it(`Should return a uri and correct ssl configuration`, async function () {
            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27_017,
                authenticationDatabase: 'users',
                authenticationMechanism: AuthenticationMechanism.PLAIN,
                ssl: true,
                sslCAFile: './cert/ca.pem',
                sslAllowInvalidCertificates: true,
                sslAllowInvalidHostnames: true
            };

            const expected = 'mongodb://localhost:27017/?authSource=users&authMechanism=PLAIN';
            const expectedOptions = {
                ssl: true,
                tlsAllowInvalidCertificates: true,
                tlsAllowInvalidHostnames: true,
                tlsCAFile: './cert/ca.pem'
            };
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);
            expect(result.options).to.deep.equal(expectedOptions);
        });
    });
}
