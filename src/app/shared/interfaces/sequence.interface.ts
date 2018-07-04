export interface ISequence {
    index: number;
    arr: string[];
    from?: number;
    to?: number;
    annotations?: any[],
    doChange?: () => {}
}

export declare type Sequences = ISequence[];