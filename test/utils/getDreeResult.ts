import { parse } from 'dree';

export function getResult(exportedPath: string): string {
    return parse(exportedPath);
}