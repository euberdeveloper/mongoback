import { DatabaseSchema } from '../../interfaces/databaseCache';
import { ListDatabasesError, ListCollectionsError } from '../../errors';
import { Database } from '../database';
import { Logger } from '../logger';

export class DatabaseSchemaCache {

    private schema: DatabaseSchema = { collections: { } };

    constructor(
        private database: Database,
        private systemCollections: boolean, 
        private throwIfLackOfPermissions: boolean, 
        private warnIfLackOfPermissions: boolean, 
        private logger: Logger
    ) { }

    public async getDatabases(): Promise<string[]> {
        if (!this.schema.databases) {
            try {
                this.schema.databases = await this.database.listDatabases();
            }
            catch (error) {
                if (this.throwIfLackOfPermissions) {
                    throw new ListDatabasesError(null, error);
                }
                else if (this.warnIfLackOfPermissions) {
                    this.logger.warn('MongoBack: cannot list databases', error);
                }
                return [];
            }
        }
        return this.schema.databases;
    }

    public async getCollections(db: string): Promise<string[]> {
        if (!this.schema.collections[db]) {
            try {
                const collections = await this.database.listCollections(db);
                this.schema.collections[db] = this.systemCollections
                    ? collections
                    : collections.filter(collection => !(/^system./.test(collection)));
            }
            catch (error) {
                if (this.throwIfLackOfPermissions) {
                    throw new ListCollectionsError(null, db, error);
                }
                else if (this.warnIfLackOfPermissions) {
                    this.logger.warn('MongoBack: cannot list collections of ' + db, error);
                }
                return [];
            }
        }
        return this.schema.collections[db];
    }

}