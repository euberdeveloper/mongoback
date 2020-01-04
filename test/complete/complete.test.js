module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: mongoExport function', function () {

        // require('./databases/databases.test')(expect, fs, path, rimraf, dree, mongoback);
        // require('./collections/collections.test')(expect, fs, path, rimraf, dree, mongoback);
        require('./collectionsWithDatabases/collectionsWithDatabases.test')(expect, fs, path, rimraf, dree, mongoback);

    });

}