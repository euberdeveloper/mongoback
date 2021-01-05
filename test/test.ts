import moduleAlias from 'module-alias';
import * as path from 'path';
moduleAlias.addAlias('@', path.join(process.cwd(), 'dist', 'source'));
moduleAlias.addAlias('@test', path.join(process.cwd(), 'dist', 'test'));

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sionnChai from 'sinon-chai';
chai.use(chaiAsPromised);
chai.use(sionnChai);

import complete from '@test/complete/complete.test';
import errors from '@test/errors/errors.test';
import getCommand from '@test/getCommand/getCommand.test';
import getMongoConnection from '@test/getMongoConnection/getMongoConnection.test';

describe('MongoBack module tests', function () {
    complete();
    errors();
    getCommand();
    getMongoConnection();
});
