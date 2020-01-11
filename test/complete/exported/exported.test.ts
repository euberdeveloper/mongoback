import { mongoExport, Options } from '../../../source/index';

import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';
import { getResult, removeExported } from '../../utils';

const EXPORTED_PATH = path.join(__dirname, 'exported');
const EXPECTED_PATH = path.join(__dirname, 'expected');

export default function () {

    describe('Test: various exported properties', function () {

        function getExpected(name: string): string {
            return require(path.join(EXPECTED_PATH, name));
        }

        this.timeout(0);
        this.beforeEach(function () {
            removeExported(EXPORTED_PATH);
        });
        this.afterAll(function () {
            removeExported(EXPORTED_PATH);
        });

        it(`Should export everything as csv, but database animals with dbName prepended and collections /collection/i as csv`, async function () {

            const options: Options = {
                all: true,
                databases: {
                    match: 'animals',
                    prependDbName: true
                },
                collections: {
                    match: /collection/i,
                    type: 'json'
                },
                silent: true,
                type: 'csv',
                fields: ['timestamp'],
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export everything, database animals prepended except for /^_.*_$/ and /^_/ as csv, collections of 12345 whose name is a number greater than 323 will be prepended with N_ and in no folder and collections /collection_[a-z]/i as csv`, async function () {

            const options: Options = {
                all: true,
                databases: {
                    match: 'animals',
                    prependDbName: true
                },
                collections: [
                    {
                        animals: {
                            collections: [
                                {
                                    match: /^_.*_$/,
                                    prependDbName: false,
                                    type: 'json'
                                },
                                /^_/
                            ],
                            type: 'csv',
                            fields: ['timestamp'],
                            prependDbName: true
                        },
                        12345: [
                            (_db, collection) => +collection > 323
                                ? { 
                                    fileName: (_db, collection, type) => `N_${collection}.${type}`,
                                    filePath: () => ``,
                                    prependDbName: false
                                }
                                : null
                        ]
                    },
                    {
                        match: /collection_[a-z]/i,
                        type: 'csv',
                        fields: ['timestamps']
                    }
                ],
                silent: true,
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

    });

}