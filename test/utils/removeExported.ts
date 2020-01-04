import * as rimraf from 'rimraf';

export function removeExported(exportedPath: string): void {
    rimraf.sync(exportedPath);
}