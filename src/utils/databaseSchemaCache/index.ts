import { DatabaseSchema } from '../../interfaces/databaseCache';
import { Database } from '../database';

export class DatabaseSchemaCache {

    private database: Database;
    private schema: DatabaseSchema = { collections: { } };
    private systemCollections: boolean;

    constructor(database: Database, systemCollections: boolean) {
        this.database = database;
        this.systemCollections = systemCollections;
    }

    public async getDatabases(): Promise<string[]> {
        if (!this.schema.databases) {
            this.schema.databases = await this.database.listDatabases();
        }
        return this.schema.databases;
    }

    public async getCollections(db: string): Promise<string[]> {
        if (!this.schema.collections[db]) {
            const collections = await this.database.listCollections(db);
            this.schema.collections[db] = this.systemCollections
                ? collections
                : collections.filter(collection => !(/^system./.test(collection)));
        }
        return this.schema.collections[db];
    }

}