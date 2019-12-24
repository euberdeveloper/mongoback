import { MongoClient } from 'mongodb';

let connection: MongoClient = null;

export async function connect(uri: string): Promise<void> {
    connection = await MongoClient.connect(uri, { useUnifiedTopology: true });
}

export async function listDatabases(): Promise<string[]> {
    return (await connection.db().admin().listDatabases()).databases.map(database => database.name);
}

export async function listCollections(db: string): Promise<string[]> {
    return (await connection.db(db).listCollections().toArray())
        .map(collection => collection.name);
}

export async function disconnect(): Promise<void> {
    await connection.close();
}