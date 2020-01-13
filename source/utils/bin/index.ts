import { Options } from '../../interfaces/options';
import { CliOptions } from '../../interfaces/bin';

import { checkMongoexportInstalled } from '../checkMongoexportInstalled';
import { mergeOptions } from '../options';
import { Logger } from '../logger';
import { getMongoConnectionFromOptions } from '../connection';
import { getParsedCollections, removeSchemaDetails } from '../getParsedCollections';
import { exportCollections } from '../exportCollections';

import { askUri } from './askUri';
import { askDestination } from './askDestination';
import { askCollections } from './askCollections';

export async function mongoExportCli(options: Options, cliOptions: CliOptions): Promise<void> {
    // Check that mongoexport is installed
    checkMongoexportInstalled();
    // Get purged options
    options = mergeOptions(options);
    // Instantiate logger util
    const logger = new Logger(options);
    // Get connection parameters
    const { uri: defaultUri, options: connectionOptions } = await getMongoConnectionFromOptions(options);
    // Ask connection uri
    const uri = await askUri(options, defaultUri, cliOptions.askUri);
    // Get default collections
    const defaultCollections = await getParsedCollections(options, { uri, options: connectionOptions }, logger);
    // Get parsed collections
    const parsedCollections = await askCollections(options, { uri, options: connectionOptions }, defaultCollections, logger, cliOptions.askCollections);
    // Log collections expected to be exported
    const expectedCollections = removeSchemaDetails(parsedCollections);
    logger.printExpectedCollections(expectedCollections);
    // Ask destination path
    await askDestination(options, cliOptions.askDestination);
    // Export collections with mongoexport and get the ones succesfully exported
    const { exportedCollections, code } = await exportCollections(parsedCollections, options, logger);
    // Log collections succesfully exported
    const actualCollections = removeSchemaDetails(exportedCollections);
    logger.printExportedCollections(actualCollections);
}