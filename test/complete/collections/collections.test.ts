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

    describe('Test: collections property', function () {

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

        it(`Should export the "dogs" collections`, async function () {

            const options: Options = {
                collections: 'dogs',
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the "horses" and "lions" collections`, async function () {

            const options: Options = {
                collections: ['horses', 'lions'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections beginning with "_"`, async function () {

            const options: Options = {
                collections: [/^_/],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections containing "collection"`, async function () {

            const options: Options = {
                collections: /collection/,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('fourth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections containing "collection" (case insensitive) and "tigers"`, async function () {

            const options: Options = {
                collections: [/collection/i, 'tigers'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('fifth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections whose third letter is "o" or beginning with a number`, async function () {

            const options: Options = {
                collections: [/^[0-9]/, (_db, collection) => collection[2] === 'o'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('sixth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections whose third letter is "o" and whose database begins with "a"`, async function () {

            const options: Options = {
                collections: [(db, collection) => collection[2] === 'o' && db[0] === 'a'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('seventh');
            expect(result).to.equal(expected);

        });

        it(`Should export collection "horses" as json and "lions" as csv`, async function () {

            const options: Options = {
                collections: [
                    'horses', 
                    {
                        collections: 'lions',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    }
                ],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('eight');
            expect(result).to.equal(expected);

        });

        it(`Should export collection "horses" as json and "lions" and matching "_*_" as csv`, async function () {

            const options: Options = {
                collections: [
                    'horses', 
                    {
                        collections: 'lions',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    },
                    {
                        collections: /^_.*_/,
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    },
                ],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('ninth');
            expect(result).to.equal(expected);

        });

        it(`Should export collection containing "collection" and matching "_*_" as json and "lions" and containing "_" as csv`, async function () {

            const options: Options = {
                collections: [
                    (_db, collection) => /^_.*_$/.test(collection) ? { type: 'json' } : false, 
                    {
                        collections: /collection/,
                        type: 'json'
                    },
                    /_/
                ],
                outDir: EXPORTED_PATH,
                type: 'csv',
                fields: ['timestamp'],
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('tenth');
            expect(result).to.equal(expected);

        });

        it(`Should not export system collections and collection "one"`, async function () {

            const options: Options = {
                collections: ['one', /system/],
                systemCollections: false,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('eleventh');
            expect(result).to.equal(expected);

        });

        it(`Should export system collection "system.version" and collection "one"`, async function () {

            const options: Options = {
                collections: ['one', /system.version/],
                systemCollections: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('twelfth');
            expect(result).to.equal(expected);

        });

        it(`Should export collections ending with "_n" prepending the db name and appending .kebab after their name`, async function () {

            const options: Options = {
                collections: {
                    collections: /_[\d]$/,
                    prependDbName: true,
                    fileName: (_db, collection, type) => `${collection}.kebab.${type}`
                },
                systemCollections: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('thirteenth');
            expect(result).to.equal(expected);

        });

    });

}