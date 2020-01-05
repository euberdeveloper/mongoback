import { mongoExport, Options } from '../../../source/lib/index';

import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';
import { getResult, removeExported } from '../../utils';

const EXPORTED_PATH = path.join(__dirname, 'exported');
const EXPECTED_PATH = path.join(__dirname, 'expected');

export default function () {

    describe('Test: collections property (with databases)', function () {

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

        it(`Should export the collection "tigers" and the ones beginning with "_" of the database animals`, async function () {

            const options: Options = {
                collections: {
                    animals: ['tigers', /^_/]
                },
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the collections matching /collection[a-z]/i of _DATABASE and matching /collection_[a-z]/i of DB`, async function () {

            const options: Options = {
                collections: {
                    _DATABASE: [/collection[a-z]/i],
                    DB: [/collection_[a-z]/i]
                },
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export collections of 12345 containing only numbers as json or beginning with 'o' as csv, collection "third" of _12345 as csv, "database/collection" as json and "database/collection'n'" as csv`, async function () {

            const options: Options = {
                collections: {
                    12345: {
                        collections: [
                            {
                                collections: /^\d+$/,
                                type: 'json'
                            },
                            (_db, collection) => collection[0] === 'o'
                        ],
                        type: 'csv'
                    },
                    _12345: [
                        {
                            collections: 'third',
                            type: 'csv',
                            fields: ['timestamp', 'n']
                        }
                    ],
                    database: [
                        'collection',
                        {
                            collections: /collection[\d]/,
                            type: 'csv',
                            fields: ['timestamp', 'domain']
                        }
                    ]
                },
                fields: ['timestamp'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

    });

}