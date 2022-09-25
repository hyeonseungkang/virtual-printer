/// <reference types="node" />
/// <reference types="node" />
import { TypedEmitter } from 'tiny-typed-emitter';
interface PrinterEvents {
    serverStart: (err: Error | null) => void;
    bonjourPublish: () => void;
    data: (data: Buffer) => void;
}
interface PrinterOption {
    name?: string;
    port?: number;
    host?: string;
    additional?: {
        description?: string;
        location?: string;
        makeAndModel?: string;
        moreInfo?: string;
    };
}
export declare class HandledJob {
    constructor(handledJobs: HandledJob[], jobName: string, jobOriginatingUserName: string);
    readonly 'job-id': number;
    readonly 'job-state' = 9;
    readonly 'job-name': string;
    readonly 'job-originating-user-name': string;
    readonly createdAt: number;
}
export declare class Printer extends TypedEmitter<PrinterEvents> {
    constructor(printerOption?: PrinterOption);
    readonly printerOption: PrinterOption;
    readonly handledJobs: HandledJob[];
    readonly started: number;
    readonly server: import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault> & PromiseLike<import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>>;
}
export {};
