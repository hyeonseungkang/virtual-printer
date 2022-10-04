"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var Constants;
(function (Constants) {
    // Values
    Constants[Constants["FALSE"] = 0] = "FALSE";
    Constants[Constants["TRUE"] = 1] = "TRUE";
    // Operation Ids
    Constants[Constants["PRINT_JOB"] = 2] = "PRINT_JOB";
    Constants[Constants["PRINT_URI"] = 3] = "PRINT_URI";
    Constants[Constants["VALIDATE_JOB"] = 4] = "VALIDATE_JOB";
    Constants[Constants["CREATE_JOB"] = 5] = "CREATE_JOB";
    Constants[Constants["SEND_DOCUMENT"] = 6] = "SEND_DOCUMENT";
    Constants[Constants["SEND_URI"] = 7] = "SEND_URI";
    Constants[Constants["CANCEL_JOB"] = 8] = "CANCEL_JOB";
    Constants[Constants["GET_JOB_ATTRIBUTES"] = 9] = "GET_JOB_ATTRIBUTES";
    Constants[Constants["GET_JOBS"] = 10] = "GET_JOBS";
    Constants[Constants["GET_PRINTER_ATTRIBUTES"] = 11] = "GET_PRINTER_ATTRIBUTES";
    Constants[Constants["HOLD_JOB"] = 12] = "HOLD_JOB";
    Constants[Constants["RELEASE_JOB"] = 13] = "RELEASE_JOB";
    Constants[Constants["RESTART_JOB"] = 14] = "RESTART_JOB";
    Constants[Constants["PAUSE_PRINTER"] = 16] = "PAUSE_PRINTER";
    Constants[Constants["RESUME_PRINTER"] = 17] = "RESUME_PRINTER";
    Constants[Constants["PURGE_JOBS"] = 18] = "PURGE_JOBS";
    // Delimiter Tags
    Constants[Constants["OPERATION_ATTRIBUTES_TAG"] = 1] = "OPERATION_ATTRIBUTES_TAG";
    Constants[Constants["JOB_ATTRIBUTES_TAG"] = 2] = "JOB_ATTRIBUTES_TAG";
    Constants[Constants["END_OF_ATTRIBUTES_TAG"] = 3] = "END_OF_ATTRIBUTES_TAG";
    Constants[Constants["PRINTER_ATTRIBUTES_TAG"] = 4] = "PRINTER_ATTRIBUTES_TAG";
    Constants[Constants["UNSUPPORTED_ATTRIBUTES_TAG"] = 5] = "UNSUPPORTED_ATTRIBUTES_TAG";
    // Value Tags (out-of-band)
    Constants[Constants["UNSUPPORTED"] = 16] = "UNSUPPORTED";
    Constants[Constants["UNKNOWN"] = 18] = "UNKNOWN";
    Constants[Constants["NO_VALUE"] = 19] = "NO_VALUE";
    // Value Tags (integer)
    Constants[Constants["INTEGER"] = 33] = "INTEGER";
    Constants[Constants["BOOLEAN"] = 34] = "BOOLEAN";
    Constants[Constants["ENUM"] = 35] = "ENUM";
    // Value Tags (octet-string)
    Constants[Constants["OCTET_STRING"] = 48] = "OCTET_STRING";
    Constants[Constants["DATE_TIME"] = 49] = "DATE_TIME";
    Constants[Constants["RESOLUTION"] = 50] = "RESOLUTION";
    Constants[Constants["RANGE_OF_INTEGER"] = 51] = "RANGE_OF_INTEGER";
    Constants[Constants["TEXT_WITH_LANG"] = 53] = "TEXT_WITH_LANG";
    Constants[Constants["NAME_WITH_LANG"] = 54] = "NAME_WITH_LANG";
    // Value Tags (character-string)
    Constants[Constants["TEXT_WITHOUT_LANG"] = 65] = "TEXT_WITHOUT_LANG";
    Constants[Constants["NAME_WITHOUT_LANG"] = 66] = "NAME_WITHOUT_LANG";
    Constants[Constants["KEYWORD"] = 68] = "KEYWORD";
    Constants[Constants["URI"] = 69] = "URI";
    Constants[Constants["URI_SCHEME"] = 70] = "URI_SCHEME";
    Constants[Constants["CHARSET"] = 71] = "CHARSET";
    Constants[Constants["NATURAL_LANG"] = 72] = "NATURAL_LANG";
    Constants[Constants["MIME_MEDIA_TYPE"] = 73] = "MIME_MEDIA_TYPE";
    // Successful Status Codes
    Constants[Constants["SUCCESSFUL_OK"] = 0] = "SUCCESSFUL_OK";
    Constants[Constants["SUCCESSFUL_OK_IGNORED_OR_SUBSTITUTED_ATTRIBUTES"] = 1] = "SUCCESSFUL_OK_IGNORED_OR_SUBSTITUTED_ATTRIBUTES";
    Constants[Constants["SUCCESSFUL_OK_CONFLICTING_ATTRIBUTES"] = 2] = "SUCCESSFUL_OK_CONFLICTING_ATTRIBUTES";
    // Client Error Status Codes
    Constants[Constants["CLIENT_ERROR_BAD_REQUEST"] = 1024] = "CLIENT_ERROR_BAD_REQUEST";
    Constants[Constants["CLIENT_ERROR_FORBIDDEN"] = 1025] = "CLIENT_ERROR_FORBIDDEN";
    Constants[Constants["CLIENT_ERROR_NOT_AUTHENTICATED"] = 1026] = "CLIENT_ERROR_NOT_AUTHENTICATED";
    Constants[Constants["CLIENT_ERROR_NOT_AUTHORIZED"] = 1027] = "CLIENT_ERROR_NOT_AUTHORIZED";
    Constants[Constants["CLIENT_ERROR_NOT_POSSIBLE"] = 1028] = "CLIENT_ERROR_NOT_POSSIBLE";
    Constants[Constants["CLIENT_ERROR_TIMEOUT"] = 1029] = "CLIENT_ERROR_TIMEOUT";
    Constants[Constants["CLIENT_ERROR_NOT_FOUND"] = 1030] = "CLIENT_ERROR_NOT_FOUND";
    Constants[Constants["CLIENT_ERROR_GONE"] = 1031] = "CLIENT_ERROR_GONE";
    Constants[Constants["CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE"] = 1032] = "CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE";
    Constants[Constants["CLIENT_ERROR_REQUEST_VALUE_TOO_LONG"] = 1033] = "CLIENT_ERROR_REQUEST_VALUE_TOO_LONG";
    Constants[Constants["CLIENT_ERROR_DOCUMENT_FORMAT_NOT_SUPPORTED"] = 1034] = "CLIENT_ERROR_DOCUMENT_FORMAT_NOT_SUPPORTED";
    Constants[Constants["CLIENT_ERROR_ATTRIBUTES_OR_VALUES_NOT_SUPPORTED"] = 1035] = "CLIENT_ERROR_ATTRIBUTES_OR_VALUES_NOT_SUPPORTED";
    Constants[Constants["CLIENT_ERROR_URI_SCHEME_NOT_SUPPORTED"] = 1036] = "CLIENT_ERROR_URI_SCHEME_NOT_SUPPORTED";
    Constants[Constants["CLIENT_ERROR_CHARSET_NOT_SUPPORTED"] = 1037] = "CLIENT_ERROR_CHARSET_NOT_SUPPORTED";
    Constants[Constants["CLIENT_ERROR_CONFLICTING_ATTRIBUTES"] = 1038] = "CLIENT_ERROR_CONFLICTING_ATTRIBUTES";
    Constants[Constants["CLIENT_ERROR_COMPRESSION_NOT_SUPPORTED"] = 1039] = "CLIENT_ERROR_COMPRESSION_NOT_SUPPORTED";
    Constants[Constants["CLIENT_ERROR_COMPRESSION_ERROR"] = 1040] = "CLIENT_ERROR_COMPRESSION_ERROR";
    Constants[Constants["CLIENT_ERROR_DOCUMENT_FORMAT_ERROR"] = 1041] = "CLIENT_ERROR_DOCUMENT_FORMAT_ERROR";
    Constants[Constants["CLIENT_ERROR_DOCUMENT_ACCESS_ERROR"] = 1042] = "CLIENT_ERROR_DOCUMENT_ACCESS_ERROR";
    // Server Error Status Codes
    Constants[Constants["SERVER_ERROR_INTERNAL_ERROR"] = 1280] = "SERVER_ERROR_INTERNAL_ERROR";
    Constants[Constants["SERVER_ERROR_OPERATION_NOT_SUPPORTED"] = 1281] = "SERVER_ERROR_OPERATION_NOT_SUPPORTED";
    Constants[Constants["SERVER_ERROR_SERVICE_UNAVAILABLE"] = 1282] = "SERVER_ERROR_SERVICE_UNAVAILABLE";
    Constants[Constants["SERVER_ERROR_VERSION_NOT_SUPPORTED"] = 1283] = "SERVER_ERROR_VERSION_NOT_SUPPORTED";
    Constants[Constants["SERVER_ERROR_DEVICE_ERROR"] = 1284] = "SERVER_ERROR_DEVICE_ERROR";
    Constants[Constants["SERVER_ERROR_TEMPORARY_ERROR"] = 1285] = "SERVER_ERROR_TEMPORARY_ERROR";
    Constants[Constants["SERVER_ERROR_NOT_ACCEPTING_JOBS"] = 1286] = "SERVER_ERROR_NOT_ACCEPTING_JOBS";
    Constants[Constants["SERVER_ERROR_BUSY"] = 1287] = "SERVER_ERROR_BUSY";
    Constants[Constants["SERVER_ERROR_JOB_CANCELED"] = 1288] = "SERVER_ERROR_JOB_CANCELED";
    Constants[Constants["SERVER_ERROR_MULTIPLE_DOCUMENT_JOBS_NOT_SUPPORTED"] = 1289] = "SERVER_ERROR_MULTIPLE_DOCUMENT_JOBS_NOT_SUPPORTED";
    // Printer states
    Constants[Constants["PRINTER_IDLE"] = 3] = "PRINTER_IDLE";
    Constants[Constants["PRINTER_PROCESSING"] = 4] = "PRINTER_PROCESSING";
    Constants[Constants["PRINTER_STOPPED"] = 5] = "PRINTER_STOPPED";
    // Job states
    Constants[Constants["JOB_PENDING"] = 3] = "JOB_PENDING";
    Constants[Constants["JOB_PENDING_HELD"] = 4] = "JOB_PENDING_HELD";
    Constants[Constants["JOB_PROCESSING"] = 5] = "JOB_PROCESSING";
    Constants[Constants["JOB_PROCESSING_STOPPED"] = 6] = "JOB_PROCESSING_STOPPED";
    Constants[Constants["JOB_CANCELED"] = 7] = "JOB_CANCELED";
    Constants[Constants["JOB_ABORTED"] = 8] = "JOB_ABORTED";
    Constants[Constants["JOB_COMPLETED"] = 9] = "JOB_COMPLETED";
})(Constants = exports.Constants || (exports.Constants = {}));
