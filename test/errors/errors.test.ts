import {
    MongoBackDatabaseError,
    MongoBackExportingError,
    MongoBackError,
    MongoBackMongoexportNotInstalledError
} from '@/errors';

import { expect } from 'chai';

export default function (): void {
    describe('Test: errors classes', function () {
        it(`Should properly create a default MongoBackError`, function () {
            const error = new MongoBackError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackError);
            expect(error.name).to.equals('MongoBackError');
        });
        it(`Should properly create a custom MongoBackError`, function () {
            const error = new MongoBackError('MESSAGE');

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackError);
            expect(error.name).to.equals('MongoBackError');
            expect(error.message).to.equals('MESSAGE');
        });

        it(`Should properly create a default MongoBackDatabaseError`, function () {
            const error = new MongoBackDatabaseError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackDatabaseError);
            expect(error.name).to.equals('MongoBackDatabaseError');
        });
        it(`Should properly create a custom MongoBackDatabaseError`, function () {
            const triggerError = new Error();
            const error = new MongoBackDatabaseError('MESSAGE', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackDatabaseError);
            expect(error.name).to.equals('MongoBackDatabaseError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default ExportingError`, function () {
            const error = new MongoBackExportingError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackExportingError);
            expect(error.name).to.equals('MongoBackExportingError');
        });
        it(`Should properly create a custom ExportingError`, function () {
            const triggerError = new Error();
            const error = new MongoBackExportingError('MESSAGE', 'db', 'collection', 'command', 'log', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackExportingError);
            expect(error.name).to.equals('MongoBackExportingError');
            expect(error.message).to.equals('MESSAGE');

            expect(error.db).to.equals('db');
            expect(error.collection).to.equals('collection');
            expect(error.command).to.equals('command');
            expect(error.log).to.equals('log');
            expect(error.triggerError).to.equals(triggerError);
        });

        it(`Should properly create a default MongoBackMongoexportNotInstalledError`, function () {
            const error = new MongoBackMongoexportNotInstalledError();

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackMongoexportNotInstalledError);
            expect(error.name).to.equals('MongoBackMongoexportNotInstalledError');
        });
        it(`Should properly create a custom MongoBackMongoexportNotInstalledError`, function () {
            const triggerError = new Error();
            const error = new MongoBackMongoexportNotInstalledError('MESSAGE', triggerError);

            expect(error).to.be.instanceOf(Error);
            expect(error).to.be.instanceOf(MongoBackMongoexportNotInstalledError);
            expect(error.name).to.equals('MongoBackMongoexportNotInstalledError');
            expect(error.message).to.equals('MESSAGE');
            expect(error.triggerError).to.equals(triggerError);
        });
    });
}
