import { CollectionsSchema, ParsedCollections } from '../parsedCollections';

export enum ExportResultCode { TOTAL = 0, PARTIAL = 1 }

export interface ExportResult {
    code: ExportResultCode;
    expected: ParsedCollections | CollectionsSchema;
    actual: ParsedCollections | CollectionsSchema;
}