import { MongoClientOptions } from 'mongodb';

export interface ConnectionParameters {
    uri: string;
    options: MongoClientOptions;
}