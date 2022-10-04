export declare class HandledJob {
    constructor(handledJobs: HandledJob[], jobName: string, jobOriginatingUserName: string);
    readonly 'job-id': number;
    readonly 'job-state' = 9;
    readonly 'job-name': string;
    readonly 'job-originating-user-name': string;
    readonly createdAt: number;
}
