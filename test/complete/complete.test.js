module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: mongoExport function', function () {

        require('./databases/databases.test')(expect, fs, path, rimraf, dree, mongoback);

    });

}