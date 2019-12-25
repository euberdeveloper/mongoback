import { Options } from './interfaces/options';
import { mongoexportInstalled } from './utils/checkMongoexportInstalled';
import { mergeOptions } from './utils/options';
import { getParsedCollections } from './utils/getParsedCollections';
import { exportCollections } from './utils/exportCollections';
import { Database } from './utils/database';
import { getMongoConnectionFromOptions } from './utils/connection';

export async function mongoExport(options?: Options): Promise<void> {
    if (mongoexportInstalled) {
        options =  mergeOptions(options || { });
        const { uri, options: connectionOptions } = await getMongoConnectionFromOptions(options);
        try {
            const database = new Database(uri, connectionOptions);
            await database.connect();
            const parsedCollections = await getParsedCollections(options, database);
            await database.disconnect();
            await exportCollections(parsedCollections, options);
        }
        catch (error) {
            console.error(`Error in connecting to database (uri = ${uri}): `, error);
        }
    }
    else {
        console.error('Error: mongoexport is not installed');
    }
}

/* mongoExport({
    uri: 'mongodb://localhost:27017',
    
    databases: ['prova'],
    jsonArray: true,
    pretty: true,

    outDir: './exported'
}); */