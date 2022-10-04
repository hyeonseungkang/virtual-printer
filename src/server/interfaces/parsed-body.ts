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

export enum Constants {
  // Values
  FALSE = 0x00,
  TRUE = 0x01,

  // Operation Ids
  PRINT_JOB = 0x02,
  PRINT_URI = 0x03,
  VALIDATE_JOB = 0x04,
  CREATE_JOB = 0x05,
  SEND_DOCUMENT = 0x06,
  SEND_URI = 0x07,
  CANCEL_JOB = 0x08,
  GET_JOB_ATTRIBUTES = 0x09,
  GET_JOBS = 0x0a,
  GET_PRINTER_ATTRIBUTES = 0x0b,
  HOLD_JOB = 0x0c,
  RELEASE_JOB = 0x0d,
  RESTART_JOB = 0x0e,
  PAUSE_PRINTER = 0x10,
  RESUME_PRINTER = 0x11,
  PURGE_JOBS = 0x12,

  // Delimiter Tags
  OPERATION_ATTRIBUTES_TAG = 0x01,
  JOB_ATTRIBUTES_TAG = 0x02,
  END_OF_ATTRIBUTES_TAG = 0x03,
  PRINTER_ATTRIBUTES_TAG = 0x04,
  UNSUPPORTED_ATTRIBUTES_TAG = 0x05,

  // Value Tags (out-of-band)
  UNSUPPORTED = 0x10,
  UNKNOWN = 0x12,
  NO_VALUE = 0x13,

  // Value Tags (integer)
  INTEGER = 0x21,
  BOOLEAN = 0x22,
  ENUM = 0x23,

  // Value Tags (octet-string)
  OCTET_STRING = 0x30, // with unspecified format
  DATE_TIME = 0x31,
  RESOLUTION = 0x32,
  RANGE_OF_INTEGER = 0x33,
  TEXT_WITH_LANG = 0x35,
  NAME_WITH_LANG = 0x36,

  // Value Tags (character-string)
  TEXT_WITHOUT_LANG = 0x41,
  NAME_WITHOUT_LANG = 0x42,
  KEYWORD = 0x44,
  URI = 0x45,
  URI_SCHEME = 0x46,
  CHARSET = 0x47,
  NATURAL_LANG = 0x48,
  MIME_MEDIA_TYPE = 0x49,

  // Successful Status Codes
  SUCCESSFUL_OK = 0x0000,
  SUCCESSFUL_OK_IGNORED_OR_SUBSTITUTED_ATTRIBUTES = 0x0001,
  SUCCESSFUL_OK_CONFLICTING_ATTRIBUTES = 0x0002,

  // Client Error Status Codes
  CLIENT_ERROR_BAD_REQUEST = 0x0400,
  CLIENT_ERROR_FORBIDDEN = 0x0401,
  CLIENT_ERROR_NOT_AUTHENTICATED = 0x0402,
  CLIENT_ERROR_NOT_AUTHORIZED = 0x0403,
  CLIENT_ERROR_NOT_POSSIBLE = 0x0404,
  CLIENT_ERROR_TIMEOUT = 0x0405,
  CLIENT_ERROR_NOT_FOUND = 0x0406,
  CLIENT_ERROR_GONE = 0x0407,
  CLIENT_ERROR_REQUEST_ENTITY_TOO_LARGE = 0x0408,
  CLIENT_ERROR_REQUEST_VALUE_TOO_LONG = 0x0409,
  CLIENT_ERROR_DOCUMENT_FORMAT_NOT_SUPPORTED = 0x040a,
  CLIENT_ERROR_ATTRIBUTES_OR_VALUES_NOT_SUPPORTED = 0x040b,
  CLIENT_ERROR_URI_SCHEME_NOT_SUPPORTED = 0x040c,
  CLIENT_ERROR_CHARSET_NOT_SUPPORTED = 0x040d,
  CLIENT_ERROR_CONFLICTING_ATTRIBUTES = 0x040e,
  CLIENT_ERROR_COMPRESSION_NOT_SUPPORTED = 0x040f,
  CLIENT_ERROR_COMPRESSION_ERROR = 0x0410,
  CLIENT_ERROR_DOCUMENT_FORMAT_ERROR = 0x0411,
  CLIENT_ERROR_DOCUMENT_ACCESS_ERROR = 0x0412,

  // Server Error Status Codes
  SERVER_ERROR_INTERNAL_ERROR = 0x0500,
  SERVER_ERROR_OPERATION_NOT_SUPPORTED = 0x0501,
  SERVER_ERROR_SERVICE_UNAVAILABLE = 0x0502,
  SERVER_ERROR_VERSION_NOT_SUPPORTED = 0x0503,
  SERVER_ERROR_DEVICE_ERROR = 0x0504,
  SERVER_ERROR_TEMPORARY_ERROR = 0x0505,
  SERVER_ERROR_NOT_ACCEPTING_JOBS = 0x0506,
  SERVER_ERROR_BUSY = 0x0507,
  SERVER_ERROR_JOB_CANCELED = 0x0508,
  SERVER_ERROR_MULTIPLE_DOCUMENT_JOBS_NOT_SUPPORTED = 0x0509,

  // Printer states
  PRINTER_IDLE = 3,
  PRINTER_PROCESSING = 4,
  PRINTER_STOPPED = 5,

  // Job states
  JOB_PENDING = 3,
  JOB_PENDING_HELD = 4,
  JOB_PROCESSING = 5,
  JOB_PROCESSING_STOPPED = 6,
  JOB_CANCELED = 7,
  JOB_ABORTED = 8,
  JOB_COMPLETED = 9,
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

export type ParsedBodyInterface = ParsedBuffer & {
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
