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

    });

}