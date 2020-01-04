module.exports = (expect, rimraf, path, sinon, mongoback) => {

    describe('Test: log property', function () {

        const EXPORTED_PATH = path.join(__dirname, 'exported');

        this.timeout(0);
        this.beforeEach(function () {
            rimraf.sync(EXPORTED_PATH);
            sinon.stub(console, 'log');
        });
        this.afterEach(function() {
            console.log.restore();
        });
        this.afterAll(function () {
            rimraf.sync(EXPORTED_PATH);
        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (silent)`, async function () {

            const options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                silent: true
            };
            await mongoback.mongoExport(options);
            
            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (log: [])`, async function () {

            const options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                log: []
            };

            await mongoback.mongoExport(options);
            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log nothing (log: null)`, async function () {

            const options = {
                collections: {
                    animals: ['dogs', 'tigers', 'lions']
                },
                outDir: EXPORTED_PATH,
                log: null
            };

            await mongoback.mongoExport(options);
            expect(console.log.notCalled).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log commands`, async function () {

            const options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['command']
            };

            await mongoback.mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWith(sinon.match(/COMMAND/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (success)`, async function () {

            const options = {
                collections: ['dogs', 'tigers', 'lions'],
                outDir: EXPORTED_PATH,
                log: ['mongoexport']
            };

            await mongoback.mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWith(sinon.match(/SUCCESS/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (error)`, async function () {

            const options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['mongoexport'],
                type: 'csv',
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            expect(console.log.calledThrice).to.be.true;
            expect(console.log.calledWith(sinon.match(/ERROR/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log mongoexports (error)`, async function () {

            const options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['command', 'mongoexport'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            expect(console.log.callCount).to.equal(6);
            expect(console.log.calledWith(sinon.match(/SUCCESS|COMMAND/))).to.be.true;

        });

        it(`Should export the "dogs", "tigers", "lions" collections and log expected and actual collections`, async function () {

            const options = {
                collections: ['dogs', 'tigers', 'lions'],
                log: ['expectedCollections', 'actualCollections'],
                outDir: EXPORTED_PATH
            };

            await mongoback.mongoExport(options);
            expect(console.log.calledTwice).to.be.true;
            expect(console.log.calledWith(sinon.match(/TO EXPORT|EXPORTED/))).to.be.true;

        });

    });

}