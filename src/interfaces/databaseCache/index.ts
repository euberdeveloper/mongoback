export interface DatabaseSchemaCollections {
    [db: string]: string[];
}

export interface DatabaseSchema {
    databases?: string[];
    collections: DatabaseSchemaCollections;
}