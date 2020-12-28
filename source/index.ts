export * from '@/errors';
export * from '@/interfaces/options';
export * from '@/interfaces/result';

import { Options } from '@/interfaces/options';
import { ExportResult } from '@/interfaces/result';

import { checkMongoexportInstalled } from '@/utils/checkMongoexportInstalled';
import { Logger } from '@/utils/logger';
import { mergeOptions } from '@/utils/options';
import { getParsedCollections, removeSchemaDetails } from '@/utils/getParsedCollections';
import { exportCollections } from '@/utils/exportCollections';
import { getMongoConnectionFromOptions } from '@/utils/connection';

/**
 * The function to export collections from a mongodb. You can specify the mongodb collection,
 * the collections that will be exported, how they will be exported and where.
 * @param options The options to specify how, where and what will be exported.
 */
export async function mongoExport(options?: Options): Promise<ExportResult> {
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
    const expectedCollections = removeSchemaDetails(parsedCollections);
    logger.printExpectedCollections(expectedCollections);
    // Export collections with mongoexport and get the ones succesfully exported
    const { exportedCollections, code } = await exportCollections(parsedCollections, options, logger);
    // Log collections succesfully exported
    const actualCollections = removeSchemaDetails(exportedCollections);
    logger.printExportedCollections(actualCollections);
    // Return the result
    return {
        code: code,
        expected: options.detailedResult ? parsedCollections : expectedCollections,
        actual: options.detailedResult ? exportedCollections : actualCollections
    };
}
