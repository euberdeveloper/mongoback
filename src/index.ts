import { Options } from './interfaces/options';

import { checkMongoexportInstalled } from './utils/checkMongoexportInstalled';
import { Logger } from './utils/logger';
import { mergeOptions } from './utils/options';
import { getParsedCollections, purgeParsedCollections } from './utils/getParsedCollections';
import { exportCollections } from './utils/exportCollections';
import { getMongoConnectionFromOptions } from './utils/connection';

export async function mongoExport(options?: Options): Promise<void> {
    // Check that mongoexport is installed
    checkMongoexportInstalled();
    // Get purged options
    options = mergeOptions(options);
    // Instantiate logger util
    const logger = new Logger(options);
    // Get connection parameters
    const dbParams = await getMongoConnectionFromOptions(options);
    // Get parsed collections
    const parsedCollections = await getParsedCollections(options, dbParams, logger);
    // Log collections expected to be exported
    const expectedCollections = purgeParsedCollections(parsedCollections);
    logger.printExpectedCollections(expectedCollections);
    // Export collections with mongoexport and get the ones succesfully exported
    const exportedCollections = await exportCollections(parsedCollections, options, logger);
    // Log collections succesfully exported
    const actualCollections = purgeParsedCollections(exportedCollections);
    logger.printExportedCollections(actualCollections);
}