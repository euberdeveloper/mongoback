import { DatabaseSchema } from '../../interfaces/databaseCache';
import { Database } from '../database';
import { ListDatabasesError, ListCollectionsError } from '../../errors';

export class DatabaseSchemaCache {

    private database: Database;
    private schema: DatabaseSchema = { collections: { } };
    private systemCollections: boolean;
    private throwIfLackOfPermissions: boolean;

    constructor(database: Database, systemCollections: boolean, throwIfLackOfPermissions: boolean) {
        this.database = database;
        this.systemCollections = systemCollections;
        this.throwIfLackOfPermissions = throwIfLackOfPermissions;
    }

    public async getDatabases(): Promise<string[]> {
        if (!this.schema.databases) {
            try {
                this.schema.databases = await this.database.listDatabases();
            }
            catch (error) {
                if (this.throwIfLackOfPermissions) {
                    throw new ListDatabasesError(null, error);
                }
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
            }
        }
        return this.schema.collections[db];
    }

}