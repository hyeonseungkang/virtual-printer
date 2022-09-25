import { Printer } from '../printer/printer';
import { ParsedBuffer, PrinterOpertaion } from 'ipp';
export declare type ParsedBodyInterface = ParsedBuffer & {
    operation: PrinterOpertaion & [];
    'operation-attributes-tag': {
        'requested-attributes': string[];
        'attributes-charset': string;
        'attributes-natural-language': string;
        'printer-uri': string;
        'requesting-user-name': string;
        'job-name': string;
    };
};
export declare function openServer(printer: Printer): Promise<void>;
