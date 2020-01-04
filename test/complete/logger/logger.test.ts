import { mongoExport, Options } from '../../../source/lib/index';

import * as path from 'path';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

chai.use(chaiAsPromised);
import { expect } from 'chai';
import { removeExported } from '../../utils';
declare const console: {
    log: sinon.SinonStub<string[], void>,
    warn: sinon.SinonStub<any[], void>
};

const EXPORTED_PATH = path.join(__dirname, 'exported');

export default function () {

    describe('Test: log property', function () {

        this.timeout(0);
        this.beforeEach(function () {
            removeExported(EXPORTED_PATH);
            sinon.stub(console, 'log');
            sinon.stub(console, 'warn');
        });
        this.afterEach(function () {
            console.log.restore();
            console.warn.restore();
        });
        this.afterAll(function () {
            removeExported(EXPORTED_PATH);
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (silent)`, async function () {

            const options: Options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                silent: true
            };
            await mongoExport(options);

            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (log: [])`, async function () {

            const options: Options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                log: []
            };

            await mongoExport(options);
            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (log: null)`, async function () {

            const options: Options = {
                uri: 'mongodb://localhost:27017',
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                log: null
            };

            await mongoExport(options);
            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log commands`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['command']
            };

            await mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWithExactly(sinon.match(/COMMAND/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (success)`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['mongoexport']
            };

            await mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWithExactly(sinon.match(/SUCCESS/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (error)`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['mongoexport'],
                type: 'csv',
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWithExactly(sinon.match(/ERROR/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log both mongoexport and command`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['command', 'mongoexport'],
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(console.log.callCount).to.equal(6);
            expect(console.log.calledWithExactly(sinon.match(/SUCCESS|COMMAND/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log expected and actual collections`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['expectedCollections', 'actualCollections'],
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(console.log.calledTwice).to.be.true;
            expect(console.log.calledWithExactly(sinon.match(/TO EXPORT|EXPORTED/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and warn when they fail`, async function () {

            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                warnIfOneFails: true,
                type: 'csv',
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(console.warn.calledThrice).to.be.true;
            expect(console.warn.calledWithExactly(sinon.match.string, sinon.match.any)).to.be.true;

        });

    });

}