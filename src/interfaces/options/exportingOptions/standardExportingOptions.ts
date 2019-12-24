export enum ExportingType {
    JSON = 'json',
    CSV = 'csv'
};

export enum ExportingJsonFormat {
    RELAXED = 'relaxed',
    CANONICAL = 'canonical'
}

export interface StandardExportingOptions {
    quiet?: boolean;
    verbose?: boolean | number;
    type?: ExportingType;
    jsonFormat?: ExportingJsonFormat;
    jsonArray?: boolean;
    pretty?: boolean;
    query?: string | any;
    fields?: string | string[];
    fieldFile?: string;
    noHeaderLine?: boolean;
    skip?: number;
    limit?: number;
    sort?: string | any;
    forceTableScan?: boolean;
}