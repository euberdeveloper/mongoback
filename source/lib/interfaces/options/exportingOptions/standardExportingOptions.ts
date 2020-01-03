export interface StandardExportingOptions {
    quiet?: boolean;
    verbose?: boolean | number;
    type?: 'json' | 'csv';
    jsonFormat?: 'realaxed | canonical';
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