module.exports = (expect, fs, path, rimraf, dree, mongoback) => {

    describe('Test: mongoExport function', function () {

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

        it(`Should export everything`, async function () {

            const options = {
                all: true,
                outDir: EXPORTED_PATH,
                log: 'base'
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('first');
            expect(result).to.equal(expected);

        });

        it(`Should export the animals database`, async function () {

            const options = {
                databases: ['animals'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('second');
            expect(result).to.equal(expected);

        });

        it(`Should export the DB database`, async function () {

            const options = {
                databases: ['DB'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('third');
            expect(result).to.equal(expected);

        });

        it(`Should export databases beginning with underscore`, async function () {

            const options = {
                databases: [/^_/],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('fourth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases beginning with underscore and DB`, async function () {

            const options = {
                databases: [/^_/, 'DB'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('fifth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases 12345 and _12345`, async function () {

            const options = {
                databases: ['12345', '_12345'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('sixth');
            expect(result).to.equal(expected);

        });

        it(`Should export databases whose char-code sum is 821 and DB`, async function () {

            const options = {
                databases: ['DB', db => [...db].reduce((prev, curr) => prev + curr.charCodeAt(0), 0) === 821],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('seventh');
            expect(result).to.equal(expected);

        });
        
        it(`Should export databases _DATABASE and _db with the name of the last appended with '_special'`, async function () {

            const options = {
                databases: [
                    '_DATABASE', 
                    {
                        name: '_db',
                        type: 'csv',
                        fields: ['timestamp', 'cpuUsage', 'random'],
                        filePath: (db, collection, type) => path.join(db, `${collection}_special.${type}`) 
                    }
                ],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('eight');
            expect(result).to.equal(expected);

        });

        it(`Should export everything as flat but animals with directory`, async function () {

            const options = {
                all: true,
                databases: [
                    {
                        name: 'animals',
                        filePath: (db, collection, type, outDir) => path.join(outDir, db, `${collection}.${type}`),
                        absolutePath: true
                    }
                ],
                outType: 'flat',
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = getResult();
            const expected = getExpected('ninth');
            expect(result).to.equal(expected);

        });

        it(`Should export also the admin database`, async function () {

            const options = {
                databases: ['admin'],
                systemCollections: true,
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            const result = fs.readdirSync(EXPORTED_PATH);
            expect(result).to.include('admin');

        });

    });

}