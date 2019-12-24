import { Options, ExportingType } from './interfaces/options';
import { mongoexportInstalled } from './utils/checkMongoexportInstalled';
import { mergeOptions, getUriFromOptions } from './utils/options';
import { getParsedCollections } from './utils/getParsedCollections';
import { exportCollections } from './utils/exportCollections';
import * as database from './utils/database';

export async function mongoExport(options?: Options): Promise<void> {
    if (mongoexportInstalled) {
        options =  mergeOptions(options || { });
        const uri = getUriFromOptions(options);
        try {
            await database.connect(uri);
            const parsedCollections = await getParsedCollections(options);
            await exportCollections(parsedCollections, options);
            await database.disconnect();
        }
        catch (error) {
            console.error(`Error in connecting to database (uri = ${uri}): `, error);
        }
    }
    else {
        console.error('Error: mongoexport is not installed');
    }
}

mongoExport({
    uri: 'mongodb://localhost:27017',
    
    collections: [
        {
            log_volante_round_1_e_2: [
                'log_01911_2005',
                'log_21911_1001',
                {
                    name: 'log_31911_1321',
                    type: ExportingType.CSV,
                    fields: 'timestamp'
                }
            ]
        }
    ],
    jsonArray: true,
    pretty: true,

    outDir: './exported'
});