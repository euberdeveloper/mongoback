import complete from '@test/complete/complete.test';
import getCommand from '@test/getCommand/getCommand.test';
import getMongoConnection from '@test/getMongoConnection/getMongoConnection.test';

describe('MongoBack module tests', function () {
    complete();
    getCommand();
    getMongoConnection();
});
