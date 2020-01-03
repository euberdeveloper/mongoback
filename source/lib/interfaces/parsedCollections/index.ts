import { ExportingOptions } from '../options';

export type ParsedCollection = { name: string } & ExportingOptions;

export interface ParsedCollections {
    [db: string]: ParsedCollection[];
}

export interface CollectionsSchema {
    [db: string]: string[];
}