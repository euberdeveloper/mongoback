import { mongoExport, Options, ExportResultCode, ExportResult, ExportingOptions } from '../../../source/lib/index';

import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
import { expect } from 'chai';
import { removeExported } from '../../utils';

const EXPORTED_PATH = path.join(__dirname, 'exported');

export default function () {

    describe('Test: result of the function', function () {

        this.timeout(0);
        this.beforeEach(function () {
            removeExported(EXPORTED_PATH);
        });
        this.afterAll(function () {
            removeExported(EXPORTED_PATH);
        });

        it(`Should result in TOTAL`, async function () {

            const options: Options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                silent: true
            };
            const result = await mongoExport(options);

            const expected: ExportResult = {
                code: ExportResultCode.TOTAL,
                expected: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                actual: {
                    animals: ['dogs', 'tigers', 'lions']
                }
            };

            expect(result).to.deep.equal(expected);

        });

        it(`Should result in PARTIAL`, async function () {

            const options: Options = {
                collections: {
                    animals: ['dogs', 'tigers', { collections: 'lions', type: 'csv' }]
                },
                outDir: EXPORTED_PATH,
                silent: true
            };
            const result = await mongoExport(options);

            const expected: ExportResult = {
                code: ExportResultCode.PARTIAL,
                expected: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                actual: {
                    animals: ['dogs', 'tigers']
                }
            };

            expect(result).to.deep.equal(expected);

        });

        it(`Should have a detailed result`, async function () {

            const options: Options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                detailedResult: true,
                outDir: EXPORTED_PATH,
                silent: true
            };
            const result = await mongoExport(options);

            const exportingOptions: ExportingOptions = {
                fieldFile: undefined,
                fields: undefined,
                fileName: undefined,
                filePath: undefined,
                jsonArray: false,
                absolutePath: false,
                jsonFormat: undefined,
                limit: undefined,
                noHeaderLine: false,
                prependDbName: undefined,
                pretty: false,
                query: undefined,
                quiet: false,
                skip: undefined,
                sort: undefined,
                type: undefined,
                verbose: false
            };
            
            const expected: ExportResult = {
                code: ExportResultCode.TOTAL,
                expected: {
                    animals: [
                        { ...exportingOptions, name: 'dogs' },
                        { ...exportingOptions, name: 'tigers' },
                        { ...exportingOptions, name: 'lions' }
                    ]
                },
                actual: {
                    animals: [
                        { ...exportingOptions, name: 'dogs' },
                        { ...exportingOptions, name: 'tigers' },
                        { ...exportingOptions, name: 'lions' }
                    ]
                }
            };

            expect(result).to.deep.equal(expected);

        });

    });

}