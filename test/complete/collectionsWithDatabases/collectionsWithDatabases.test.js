module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: collections property (with databases)', function () {

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

        it(`Should export the collection "tigers" and the ones beginning with "_" of the database animals`, async function () {

            const options = {
                collections: {
                    animals: ['tigers', /^_/]
                },
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the collections matching /collection[a-z]/i of _DATABASE and matching /collection_[a-z]/i of DB`, async function () {

            const options = {
                collections: {
                    _DATABASE: [/collection[a-z]/i],
                    DB: [/collection_[a-z]/i]
                },
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export collections of 12345 containing only numbers as json or beginning with 'o' as csv, collection "third" of _12345 as csv, "database/collection" as json and "database/collection'n'" as csv`, async function () {

            const options = {
                collections: {
                    12345: {
                        collections: [
                            {
                                name: /^\d+$/,
                                type: 'json'
                            },
                            (_db, collection) => collection[0] === 'o'
                        ],
                        type: 'csv'
                    },
                    _12345: [
                        {
                            name: 'third',
                            type: 'csv',
                            fields: ['timestamp', 'n']
                        }
                    ],
                    database: [
                        'collection',
                        {
                            name: /collection[\d]/,
                            type: 'csv',
                            fields: ['timestamp', 'domain']
                        }
                    ]
                },
                fields: ['timestamp'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

    });

}