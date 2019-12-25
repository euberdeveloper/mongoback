import { MongoClient, MongoClientOptions } from 'mongodb';

export class Database {

    private uri: string;
    private connection: MongoClient = null;
    private options: MongoClientOptions = { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    };

    public constructor(uri: string, options: MongoClientOptions) {
        this.uri = uri;
        this.options = { ...options, ...this.options };
    }

    public async connect(): Promise<void> {
        this.connection = await MongoClient.connect(this.uri, this.options);
    }

    public async listDatabases(): Promise<string[]> {
        return (await this.connection.db().admin().listDatabases())
            .databases.map(database => database.name);
    }
    
    public async listCollections(db: string): Promise<string[]> {
        return (await this.connection.db(db).listCollections().toArray())
            .map(collection => collection.name);
    }
    
    public async disconnect(): Promise<void> {
        await this.connection.close();
    }

}