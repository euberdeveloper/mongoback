import * as moduleAlias from 'module-alias';
import * as path from 'path';
moduleAlias.addAlias('@', path.join(process.cwd(), 'dist', 'source'));
moduleAlias.addAlias('@src', path.join(process.cwd(), 'dist', 'source'));
moduleAlias.addAlias('@test', path.join(process.cwd(), 'dist', 'test'));

import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sionnChai from 'sinon-chai';
chai.use(chaiAsPromised);
chai.use(sionnChai);

import complete from '@test/complete/complete.test';
import errors from '@test/errors/errors.test';
import getCommand from '@test/getCommand/getCommand.test';
import getMongoConnection from '@test/getMongoConnection/getMongoConnection.test';
import checkMongoexportInstalled from '@test/checkMongoexportInstalled/checkMongoexportInstalled.test';

describe('MongoBack module tests', function () {
    complete();
    errors();
    getCommand();
    getMongoConnection();
    checkMongoexportInstalled();
});
