import { Options } from './interfaces/options';
import { Database } from './utils/database';
import { Logger } from './utils/logger';
import { mongoexportInstalled } from './utils/checkMongoexportInstalled';
import { mergeOptions } from './utils/options';
import { getParsedCollections, purgeParsedCollections } from './utils/getParsedCollections';
import { exportCollections } from './utils/exportCollections';
import { getMongoConnectionFromOptions } from './utils/connection';

export async function mongoExport(options?: Options): Promise<void> {
    if (mongoexportInstalled) {
        options = mergeOptions(options || { });
        const logger = new Logger(options);
        const { uri, options: connectionOptions } = await getMongoConnectionFromOptions(options);
        try {
            const database = new Database(uri, connectionOptions);
            await database.connect();
            const parsedCollections = await getParsedCollections(options, database);
            const expectedCollections = purgeParsedCollections(parsedCollections);
            logger.printExpectedCollections(expectedCollections);
            await database.disconnect();
            await exportCollections(parsedCollections, options, logger);
        }
        catch (error) {
            console.error(`Error in connecting to database (uri = ${uri}): `, error);
        }
    }
    else {
        console.error('Error: mongoexport is not installed');
    }
}