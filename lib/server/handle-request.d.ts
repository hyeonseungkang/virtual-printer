import { Printer } from '../printer/printer';
import { ParsedBodyInterface } from './open-server';
export declare function printJob(printer: Printer, parsedBody: ParsedBodyInterface): {
    'status-code': import("ipp").StatusCode;
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
export declare function getPrinterAttributes(printer: Printer, parsedBody: ParsedBodyInterface): Record<string, any>;
export declare function validateJob(printer: Printer, parsedBody: ParsedBodyInterface): {
    'status-code': import("ipp").StatusCode;
    'version-number': string;
    'request-id': number;
    'operation-attributes-tag': {
        'attributes-charset': string;
        'attributes-natural-language': string;
    };
};
export declare function getJobs(printer: Printer, parsedBody: ParsedBodyInterface): {
    'status-code': import("ipp").StatusCode;
    'version-number': string;
    'request-id': number;
    'operation-attributes-tag': {
        'attributes-charset': string;
        'attributes-natural-language': string;
        'status-code': string;
    };
    'job-attributes-tag': {};
};
