/// <reference types="node" />
import { Printer } from '../printer/printer';
import { ParsedIPP } from './interfaces/parsed-body';
export declare function printJob(printer: Printer, parsedBody: ParsedIPP, raw: Buffer[]): {
    statusCode: string;
    'version-number': string;
    'request-id': number;
    'operation-attributes-tag': {
        'attributes-charset': string;
        'attributes-natural-language': string;
        'status-message': string;
    };
    'job-attributes-tag': {
        'job-id': number;
        'job-state': number;
    };
};
export declare function getPrinterAttributes(printer: Printer, parsedBody: ParsedIPP): Record<string, any>;
export declare function validateJob(printer: Printer, parsedBody: ParsedIPP): {
    statusCode: string;
    'version-number': string;
    'request-id': number;
    'operation-attributes-tag': {
        'attributes-charset': string;
        'attributes-natural-language': string;
    };
};
export declare function getJobs(printer: Printer, parsedBody: ParsedIPP): {
    statusCode: string;
    'version-number': string;
    'request-id': number;
    'operation-attributes-tag': {
        'attributes-charset': string;
        'attributes-natural-language': string;
    };
    'job-attributes-tag': {};
};
