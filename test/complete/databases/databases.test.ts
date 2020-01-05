import { mongoExport, Options } from '../../../source/lib/index';

import * as fs from 'fs';
import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';
import { getResult, removeExported } from '../../utils';

const EXPORTED_PATH = path.join(__dirname, 'exported');
const EXPECTED_PATH = path.join(__dirname, 'expected');

export default function () {

    describe('Test: databases property', function () {

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

        it(`Should export everything`, async function () {

            const options: Options = {
                all: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the animals database`, async function () {

            const options: Options = {
                databases: ['animals'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export the DB database`, async function () {

            const options: Options = {
                databases: 'DB',
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

        it(`Should export databases beginning with underscore`, async function () {

            const options: Options = {
                databases: /^_/,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('fourth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases beginning with underscore and DB`, async function () {

            const options: Options = {
                databases: [/^_/, 'DB'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('fifth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases 12345 and _12345`, async function () {

            const options: Options = {
                databases: ['12345', '_12345'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('sixth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases whose char-code sum is 821 and DB`, async function () {

            const options: Options = {
                databases: ['DB', db => [...db].reduce((prev, curr) => prev + curr.charCodeAt(0), 0) === 821],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('seventh');
            expect(result).to.equal(expected);

        });

        it(`Should export databases _DATABASE and _db with the name of the last appended with '_special'`, async function () {

            const options: Options = {
                databases: [
                    '_DATABASE',
                    {
                        databases: '_db',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random'],
                        filePath: (db, collection, type) => path.join(db, `${collection}_special.${type}`)
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

        it(`Should export everything as flat but animals with directory`, async function () {

            const options: Options = {
                all: true,
                databases: {
                    databases: 'animals',
                    filePath: (db, collection, type, outDir) => path.join(outDir, db, `${collection}.${type}`),
                    absolutePath: true
                },
                outType: 'flat',
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = getResult(EXPORTED_PATH);
            const expected = getExpected('ninth');
            expect(result).to.equal(expected);

        });

        it(`Should export also the admin database`, async function () {

            const options: Options = {
                databases: ['admin'],
                systemCollections: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoExport(options);
            const result = fs.readdirSync(EXPORTED_PATH);
            expect(result).to.include('admin');

        });

    });

}