/// <reference types="node" />
/// <reference types="node" />
import { HandledJob } from './vos/handled-job';
import { TypedEmitter } from 'tiny-typed-emitter';
interface PrinterEvents {
    'server-opened': (error?: Error | null) => void;
    data: (handledJob: HandledJob, data: Buffer) => void;
    'bonjour-published': (error?: Error | null) => void;
    'bonjour-name-change': (name: string) => void;
    'bonjour-hostname-change': (hostname: string) => void;
}
interface PrinterOptionsRequest {
    /**
     * printer-name (name(127))
     */
    name?: string;
    /**
     * printer-uri-supported (1setOf uri)
     */
    uri?: URL;
    /**
     * printer-info (text(127))
     */
    description?: string;
    /**
     * printer-location (text(127))
     */
    location?: string;
    /**
     * printer-more-info (uri)
     */
    moreInfo?: URL;
    /**
     * uri-security-supported (1setOf type2 keyword) 'tls', 'none'
     */
    security?: boolean;
    /**
     * document-format-supported (1setOf mimeMediaType)
     * 'application/postscript', 'application/pdf', 'application/octet-stream' ...IANA MIME TYPES
     *
     */
    format?: string[];
    /**
     * publish to bonjour
     */
    bonjour?: boolean;
}
interface PrinterOptions {
    name: string;
    uri: URL;
    description: string;
    location: string;
    moreInfo: URL;
    security: boolean;
    format: string[];
    bonjour: boolean;
}
export declare class Printer extends TypedEmitter<PrinterEvents> {
    constructor(options?: PrinterOptionsRequest);
    readonly printerOption: PrinterOptions;
    readonly handledJobs: HandledJob[];
    readonly startedAt: Date;
    readonly server: import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault> & PromiseLike<import("fastify").FastifyInstance<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>>;
}
export {};
