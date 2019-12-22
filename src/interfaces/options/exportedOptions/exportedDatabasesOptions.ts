import { ExportingOptions } from "../exportingOptions";

export type LambdaExportedDatabase = ((db: string) => (boolean | ExportingOptions));
export type OptionedExportedDatabase = { name: (string | RegExp) } & ExportingOptions;
export type ExportedDatabase = string | RegExp | OptionedExportedDatabase | LambdaExportedDatabase;
export type ExportedDatabases = ExportedDatabase[];

function isFunction(obj: any): boolean {
    return obj && {}.toString.call(obj) === '[object Function]';
}

export function instanceOfLambdaExportedDatabase(obj: ExportedDatabase): obj is LambdaExportedDatabase {
    return isFunction(obj);
}