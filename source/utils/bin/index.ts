import { Options } from "../../interfaces/options";
import { CliOptions } from "../../interfaces/bin";

import { checkMongoexportInstalled } from "../checkMongoexportInstalled";
import { mergeOptions } from "../options";
import { Logger } from "../logger";
import { getMongoConnectionFromOptions } from "../connection";
import { getParsedCollections, removeSchemaDetails } from "../getParsedCollections";
import { exportCollections } from "../exportCollections";

//askUri
//askCollections
//askDestination

export async function mongoExportCli(options: Options, cliOptions: CliOptions): Promise<void> {
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
}