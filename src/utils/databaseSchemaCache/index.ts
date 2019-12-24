import { DatabaseSchema } from '../../interfaces/databaseCache';
import { Database } from '../database';

export class DatabaseSchemaCache {

    private database: Database;
    private schema: DatabaseSchema = { collections: { } };

    constructor(database: Database) {
        this.database = database;
    }

    public async getDatabases(): Promise<string[]> {
        if (!this.schema.databases) {
            this.schema.databases = await this.database.listDatabases();
        }
        return this.schema.databases;
    }

    public async getCollections(db: string): Promise<string[]> {
        if (!this.schema.collections[db]) {
            this.schema.collections[db] = await this.database.listCollections(db);
        }
        return this.schema.collections[db];
    }

}