export type LogType = 'base' | 'command' | 'mongoexport' | 'expectedCollections' | 'actualCollections';
export type LogTypes = LogType[];

export interface LogOptions {
    silent?: boolean;
    log?: LogTypes | LogType;
}