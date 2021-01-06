import { mongoExport, Options } from '@/index';

import * as path from 'path';
import * as sinon from 'sinon';
import { SinonSandbox, SinonStub } from 'sinon';
import { expect } from 'chai';
import { removeExported } from '@test/utils';

const EXPORTED_PATH = path.join(__dirname, 'exported');

export default function (): void {
    describe('Test: log property', function () {
        let sandbox: SinonSandbox, stubConsoleLog: SinonStub<any[], void>, stubConsoleWarn: SinonStub<any[], void>;

        this.timeout(0);
        this.beforeAll(function () {
            sandbox = sinon.createSandbox();
            stubConsoleLog = sinon.stub(console, 'log');
            stubConsoleWarn = sinon.stub(console, 'warn');
        });
        this.beforeEach(function () {
            removeExported(EXPORTED_PATH);
        });
        this.afterEach(function () {
            stubConsoleLog.reset();
            stubConsoleWarn.reset();
        });
        this.afterAll(function () {
            sandbox.restore();
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

            expect(stubConsoleLog).to.have.not.been.called;
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
            expect(stubConsoleLog).to.have.not.been.called;
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (log: null)`, async function () {
            const options: Options = {
                uri: 'mongodb://localhost:27017',
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                log: null as any
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.not.been.called;
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log commands`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['command']
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.been.calledThrice;
            expect(stubConsoleLog).to.have.been.calledWithExactly(sinon.match(/COMMAND/));
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (success)`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['mongoexport']
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.been.calledThrice;
            expect(stubConsoleLog).to.have.been.calledWithExactly(sinon.match(/SUCCESS/));
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (error)`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['mongoexport'],
                type: 'csv',
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.been.calledThrice;
            expect(stubConsoleLog).to.have.been.calledWithExactly(sinon.match(/ERROR/));
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log both mongoexport and command`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['command', 'mongoexport'],
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.callCount(6);
            expect(stubConsoleLog).to.have.been.calledWithExactly(sinon.match(/SUCCESS|COMMAND/));
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log expected and actual collections`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['expectedCollections', 'actualCollections'],
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(stubConsoleLog).to.have.been.calledTwice;
            expect(stubConsoleLog).to.have.been.calledWithExactly(sinon.match(/TO EXPORT|EXPORTED/));
        });

        it(`Should export the "dogs", "tigers", "lions" collections and warn when they fail`, async function () {
            const options: Options = {
                collections: ['dogs', 'tigers', 'lions'],
                warnIfOneFails: true,
                type: 'csv',
                outDir: EXPORTED_PATH
            };

            await mongoExport(options);
            expect(stubConsoleWarn).to.have.been.calledThrice;
            expect(stubConsoleWarn).to.have.been.calledWithExactly(sinon.match.string, sinon.match.any);
        });
    });
}
