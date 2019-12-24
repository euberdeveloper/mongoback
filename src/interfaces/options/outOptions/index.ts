export enum OutType {
    DEEP = 'deep',
    FLAT = 'flat'
};

export interface OutOptions {
    outDir?: string;
    outType?: OutType;
};