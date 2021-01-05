import { MongoexportNotInstalledError } from '@/errors';
import { checkMongoexportInstalled } from '@/utils/checkMongoexportInstalled';

import { expect } from 'chai';
import * as sinon from 'sinon';
import proxyquire from 'proxyquire';

export default function (): void {
    describe('Test: checkMongoexportInstalled auxiliary function', function () {
        it(`Should pass when mongoexport is installed`, function () {
            const expected = true;
            const fakeChecker = sinon.fake.returns(expected);
            const proxyedModule = proxyquire('@/utils/checkMongoexportInstalled', {
                'command-exists': {
                    sync: fakeChecker
                }
            });
            const mockedCheckMongoexportInstalled: typeof checkMongoexportInstalled =
                proxyedModule.checkMongoexportInstalled;
            expect(mockedCheckMongoexportInstalled).to.not.throw();
            expect(fakeChecker).to.have.been.calledOnceWithExactly('mongoexport');
        });

        it(`Should throw a MongoexportNotInstalledError error when mongoexport is not installed`, function () {
            const expected = false;
            const fakeChecker = sinon.fake.returns(expected);
            const proxyedModule = proxyquire('@/utils/checkMongoexportInstalled', {
                'command-exists': {
                    sync: fakeChecker
                }
            });
            const mockedCheckMongoexportInstalled: typeof checkMongoexportInstalled =
                proxyedModule.checkMongoexportInstalled;
            expect(mockedCheckMongoexportInstalled).to.throw(MongoexportNotInstalledError);
            expect(fakeChecker).to.have.been.calledOnceWithExactly('mongoexport');
        });
    });
}
