module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: various exported properties', function () {

        const EXPORTED_PATH = path.join(__dirname, 'exported');
        const EXPECTED_PATH = path.join(__dirname, 'expected');

        function getResult() {
            return dree.parse(EXPORTED_PATH);
        }
        function getExpected(name) {
            return require(path.join(EXPECTED_PATH, name));
        }

        this.timeout(0);
        this.beforeEach(function () {
            rimraf.sync(EXPORTED_PATH);
        });
        this.afterAll(function () {
            rimraf.sync(EXPORTED_PATH);
        });

        it(`Should export everything as csv, but database animals with dbName prepended and collections /collection/i as csv`, async function () {

            const options = {
                all: true,
                databases: [{
                    name: 'animals',
                    prependDbName: true
                }],
                collections: [{
                    name: /collection/i,
                    type: 'json'
                }],
                silent: true,
                type: 'csv',
                fields: ['timestamp'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export everything, including system collections, database animals prepended except for /^_.*_$/ and /^_/ as csv, collections of 12345 whose name is a number greater than 323 will be prepended with N_ and in no folder and collections /collection_[a-z]/i as csv`, async function () {

            const options = {
                all: true,
                systemCollections: true,
                databases: [{
                    name: 'animals',
                    prependDbName: true
                }],
                collections: [
                    {
                        animals: {
                            collections: [
                                {
                                    name: /^_.*_$/,
                                    prependDbName: false,
                                    type: 'json'
                                },
                                /^_/
                            ],
                            type: 'csv',
                            fields: ['timestamp'],
                            prependDbName: true
                        },
                        12345: [
                            (_db, collection) => +collection > 323
                                ? { 
                                    fileName: (_db, collection, type) => `N_${collection}.${type}`,
                                    filePath: () => ``,
                                    prependDbName: false
                                }
                                : null
                        ]
                    },
                    {
                        name: /collection_[a-z]/i,
                        type: 'csv',
                        fields: ['timestamps']
                    }
                ],
                //silent: true,
                log: ['expectedCollections', 'base'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            fs.writeFileSync(path.join(EXPECTED_PATH, 'second.js'), 'module.exports = `' + result + '`;')
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

    });

}