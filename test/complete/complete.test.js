module.exports = (expect, fs, path, rimraf, dree, sinon, mongoback) => {

    describe('Test: mongoExport function', function () {

        require('./databases/databases.test')(expect, fs, path, rimraf, dree, mongoback);
        require('./collections/collections.test')(expect, fs, path, rimraf, dree, mongoback);
        require('./collectionsWithDatabases/collectionsWithDatabases.test')(expect, fs, path, rimraf, dree, mongoback);
        require('./exported/exported.test')(expect, fs, path, rimraf, dree, mongoback);
        require('./logger/logger.test')(expect, rimraf, path, sinon, mongoback);

    });

}