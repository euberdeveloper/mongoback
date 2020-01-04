module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: collections property', function () {

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

        it(`Should export the "dogs" collections`, async function () {

            const options = {
                collections: ['dogs'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the "horses" and "lions" collections`, async function () {

            const options = {
                collections: ['horses', 'lions'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections beginning with "_"`, async function () {

            const options = {
                collections: [/^_/],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections containing "collection"`, async function () {

            const options = {
                collections: [/collection/],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('fourth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections containing "collection" (case insensitive) and "tigers"`, async function () {

            const options = {
                collections: [/collection/i, 'tigers'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('fifth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections whose third letter is "o" or beginning with a number`, async function () {

            const options = {
                collections: [/^[0-9]/, (_db, collection) => collection[2] === 'o'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('sixth');
            expect(result).to.equal(expected);

        });

        it(`Should export all collections whose third letter is "o" and whose database begins with "a"`, async function () {

            const options = {
                collections: [(db, collection) => collection[2] === 'o' && db[0] === 'a'],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('seventh');
            expect(result).to.equal(expected);

        });

        it(`Should export collection "horses" as json and "lions" as csv`, async function () {

            const options = {
                collections: [
                    'horses', 
                    {
                        name: 'lions',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    }
                ],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('eight');
            expect(result).to.equal(expected);

        });

        it(`Should export collection "horses" as json and "lions" and matching "_*_" as csv`, async function () {

            const options = {
                collections: [
                    'horses', 
                    {
                        name: 'lions',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    },
                    {
                        name: /^_.*_/,
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random']
                    },
                ],
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            fs.writeFileSync(path.join(EXPECTED_PATH, 'ninth.js'), 'module.exports = `' + result + '`;');
            const expected = getExpected('ninth');
            expect(result).to.equal(expected);

        });

        it(`Should export collection containing "collection" and matching "_*_" as json and "lions" and containing "_" as csv`, async function () {

            const options = {
                collections: [
                    (_db, collection) => /^_.*_$/.test(collection) ? { type: 'json' } : false, 
                    {
                        name: /collection/,
                        type: 'json'
                    },
                    /_/
                ],
                outDir: EXPORTED_PATH,
                type: 'csv',
                fields: ['timestamp'],
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('tenth');
            expect(result).to.equal(expected);

        });

        it(`Should not export system collections and collection "one"`, async function () {

            const options = {
                collections: ['one', /system/],
                systemCollections: false,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('eleventh');
            expect(result).to.equal(expected);

        });

        it(`Should export system collections and collection "one"`, async function () {

            const options = {
                collections: ['one', /system/],
                systemCollections: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            fs.writeFileSync(path.join(EXPECTED_PATH, 'twelfth.js'), 'module.exports = `' + result + '`;');
            const expected = getExpected('twelfth');
            expect(result).to.equal(expected);

        });

        it(`Should export collections ending with "_n" prepending the db name and appending .kebab after their name`, async function () {

            const options = {
                collections: [ {
                    name: /_[\d]$/,
                    prependDbName: true,
                    fileName: (_db, collection, type) => `${collection}.kebab.${type}`
                }],
                systemCollections: true,
                outDir: EXPORTED_PATH,
                silent: true
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('thirteenth');
            expect(result).to.equal(expected);

        });

    });

}