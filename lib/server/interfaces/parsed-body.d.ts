import { ParsedBuffer, PrinterOpertaion } from 'ipp';
export interface Attribute {
    tag: Constants;
    name: string;
    value: any;
}
export interface Group {
    tag: Constants;
    attributes: Attribute[];
}
export declare enum Constants {
    FALSE = 0,
    TRUE = 1,
    PRINT_JOB = 2,
    PRINT_URI = 3,
    VALIDATE_JOB = 4,
    CREATE_JOB = 5,
    SEND_DOCUMENT = 6,
    SEND_URI = 7,
    CANCEL_JOB = 8,
    GET_JOB_ATTRIBUTES = 9,
    GET_JOBS = 10,
    GET_PRINTER_ATTRIBUTES = 11,
    HOLD_JOB = 12,
    RELEASE_JOB = 13,
    RESTART_JOB = 14,
    PAUSE_PRINTER = 16,
    RESUME_PRINTER = 17,
    PURGE_JOBS = 18,
    OPERATION_ATTRIBUTES_TAG = 1,
    JOB_ATTRIBUTES_TAG = 2,
    END_OF_ATTRIBUTES_TAG = 3,
    PRINTER_ATTRIBUTES_TAG = 4,
    UNSUPPORTED_ATTRIBUTES_TAG = 5,
    UNSUPPORTED = 16,
    UNKNOWN = 18,
    NO_VALUE = 19,
    INTEGER = 33,
    BOOLEAN = 34,
    ENUM = 35,
    OCTET_STRING = 48,
    DATE_TIME = 49,
    RESOLUTION = 50,
    RANGE_OF_INTEGER = 51,
    TEXT_WITH_LANG = 53,
    NAME_WITH_LANG = 54,
    TEXT_WITHOUT_LANG = 65,
    NAME_WITHOUT_LANG = 66,
    KEYWORD = 68,
    URI = 69,
    URI_SCHEME = 70,
    CHARSET = 71,
    NATURAL_LANG = 72,
    MIME_MEDIA_TYPE = 73,
    SUCCESSFUL_OK = 0,
    SUCCESSFUL_OK_IGNORED_OR_SUBSTITUTED_ATTRIBUTES = 1,
    SUCCESSFUL_OK_CONFLICTING_ATTRIBUTES = 2,
    CLIENT_ERROR_BAD_REQUEST = 1024,
    CLIENT_ERROR_FORBIDDEN = 1025,
    CLIENT_ERROR_NOT_AUTHENTICATED = 1026,
    CLIENT_ERROR_NOT_AUTHORIZED = 1027,
    CLIENT_ERROR_NOT_POSSIBLE = 1028,
    CLIENT_ERROR_TIMEOUT = 1029,
    CLIENT_ERROR_NOT_FOUND = 1030,
    CLIENT_ERROR_GONE = 1031,
    CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE = 1032,
    CLIENT_ERROR_REQUEST_VALUE_TOO_LONG = 1033,
    CLIENT_ERROR_DOCUMENT_FORMAT_NOT_SUPPORTED = 1034,
    CLIENT_ERROR_ATTRIBUTES_OR_VALUES_NOT_SUPPORTED = 1035,
    CLIENT_ERROR_URI_SCHEME_NOT_SUPPORTED = 1036,
    CLIENT_ERROR_CHARSET_NOT_SUPPORTED = 1037,
    CLIENT_ERROR_CONFLICTING_ATTRIBUTES = 1038,
    CLIENT_ERROR_COMPRESSION_NOT_SUPPORTED = 1039,
    CLIENT_ERROR_COMPRESSION_ERROR = 1040,
    CLIENT_ERROR_DOCUMENT_FORMAT_ERROR = 1041,
    CLIENT_ERROR_DOCUMENT_ACCESS_ERROR = 1042,
    SERVER_ERROR_INTERNAL_ERROR = 1280,
    SERVER_ERROR_OPERATION_NOT_SUPPORTED = 1281,
    SERVER_ERROR_SERVICE_UNAVAILABLE = 1282,
    SERVER_ERROR_VERSION_NOT_SUPPORTED = 1283,
    SERVER_ERROR_DEVICE_ERROR = 1284,
    SERVER_ERROR_TEMPORARY_ERROR = 1285,
    SERVER_ERROR_NOT_ACCEPTING_JOBS = 1286,
    SERVER_ERROR_BUSY = 1287,
    SERVER_ERROR_JOB_CANCELED = 1288,
    SERVER_ERROR_MULTIPLE_DOCUMENT_JOBS_NOT_SUPPORTED = 1289,
    PRINTER_IDLE = 3,
    PRINTER_PROCESSING = 4,
    PRINTER_STOPPED = 5,
    JOB_PENDING = 3,
    JOB_PENDING_HELD = 4,
    JOB_PROCESSING = 5,
    JOB_PROCESSING_STOPPED = 6,
    JOB_CANCELED = 7,
    JOB_ABORTED = 8,
    JOB_COMPLETED = 9
}
export interface ParsedIPP {
    version: {
        major: number;
        minor: number;
    };
    operationId: Constants;
    requestId: number;
    groups: Group[];
    data: {
        type: string;
        data: any;
    };
}
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
