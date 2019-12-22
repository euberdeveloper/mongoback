import { ExportingOptions } from "../exportingOptions";

export type LambdaExportedIndipendentCollection = ((db: string, collection: string) => (boolean | ExportingOptions));
export type OptionedExportedIndipendentCollection = { name: (string | RegExp) } & ExportingOptions;
export type ExportedIndipendentCollection = string | RegExp | OptionedExportedIndipendentCollection | LambdaExportedIndipendentCollection;
export type ExportedIndipendentCollections = ExportedIndipendentCollection[];

function isFunction(obj: any): boolean {
    return obj && {}.toString.call(obj) === '[object Function]';
}

export function instanceOfLambdaExportedIndipendentCollection(obj: ExportedIndipendentCollection): obj is LambdaExportedIndipendentCollection {
    return isFunction(obj);
}