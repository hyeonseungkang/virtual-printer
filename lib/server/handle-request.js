"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = exports.validateJob = exports.getPrinterAttributes = exports.printJob = void 0;
var handled_job_1 = require("../printer/vos/handled-job");
var parsed_body_1 = require("./interfaces/parsed-body");
function printJob(printer, parsedBody, raw) {
    var jobName = '';
    var requestingUserName = '';
    try {
        var group = parsedBody.groups.find(function (v) { return v.tag === parsed_body_1.Constants.OPERATION_ATTRIBUTES_TAG; });
        jobName = group.attributes.find(function (v) { return v.name === 'job-name'; })
            .value[0];
        requestingUserName = group.attributes.find(function (v) { return v.name === 'requesting-user-name'; }).value[0];
    }
    finally {
    }
    var handledJob = new handled_job_1.HandledJob(printer.handledJobs, jobName, requestingUserName);
    printer.handledJobs.push(handledJob);
    printer.emit('data', handledJob, Buffer.concat(raw.slice(1, raw.length)));
    return {
        statusCode: 'successful-ok',
        'version-number': '1.1',
        'request-id': parsedBody.requestId,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
            'status-message': 'successful-ok',
        },
        'job-attributes-tag': {
            'job-id': handledJob['job-id'],
            'job-state': 9,
        },
    };
}
exports.printJob = printJob;
function getPrinterAttributes(printer, parsedBody) {
    var data = {
        statusCode: 'successful-ok',
        'version-number': '1.1',
        'request-id': parsedBody.requestId,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
        },
        'printer-attributes-tag': {
            'printer-info': printer.printerOption.description,
            'printer-is-accepting-jobs': true,
            'printer-location': printer.printerOption.location,
            'printer-name': printer.printerOption.name,
            'printer-more-info': printer.printerOption.moreInfo.toString(),
            'printer-uri-supported': printer.printerOption.uri.toString(),
            'uri-security-supported': !printer.printerOption.security
                ? 'none'
                : 'tls',
            'uri-authentication-supported': 'requesting-user-name',
            'operations-supported': [
                'Print-Job',
                'Validate-Job',
                'Get-Printer-Attributes',
            ],
            'printer-state': parsed_body_1.Constants.PRINTER_IDLE,
            'printer-state-reasons': 'none',
            'compression-supported': 'none',
            'queued-job-count': 0,
            'document-format-supported': printer.printerOption.format,
            'document-format-default': printer.printerOption.format[0],
            'ipp-versions-supported': '1.1',
        },
    };
    return data;
}
exports.getPrinterAttributes = getPrinterAttributes;
function validateJob(printer, parsedBody) {
    return {
        statusCode: 'successful-ok',
        'version-number': '1.1',
        'request-id': parsedBody.requestId,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
        },
    };
}
exports.validateJob = validateJob;
function getJobs(printer, parsedBody) {
    return {
        statusCode: 'successful-ok',
        'version-number': '1.1',
        'request-id': parsedBody.requestId,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
        },
        'job-attributes-tag': {},
    };
}
exports.getJobs = getJobs;
