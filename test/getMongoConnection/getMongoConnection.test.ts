import { ConnectionOptions } from '../../source/lib/index';
import { getMongoConnectionFromOptions } from '../../source/lib/utils/connection/index';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';

export default function () {

    describe('Test: getMongoConnectionFromOptions auxiliary function', async function () {

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
                port: 27017
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
                ]
            };

            const expected = 'mongodb://localhost:27017,localhost:8080,euber:2323';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);

        });

        it(`Should return a uri with username`, async function () {

            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
                username: 'euber'
            };

            const expected = 'mongodb://euber@localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);

        });

        it(`Should return a uri with username and password`, async function () {

            const options: ConnectionOptions = {
                host: 'localhost',
                port: 27017,
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
                port: 27017,
                srv: true
            };

            const expected = 'mongodb+srv://localhost:27017';
            const result = await getMongoConnectionFromOptions(options);
            expect(result.uri).to.equal(expected);

        });

    });

}