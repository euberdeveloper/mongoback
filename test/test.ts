import complete from './complete/complete.test';
import getCommand from './getCommand/getCommand.test';
import getMongoConnection from './getMongoConnection/getMongoConnection.test';

describe('MongoBack module tests', function() {

    complete();
    getCommand();
    getMongoConnection();

});