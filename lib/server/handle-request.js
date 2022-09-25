"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = exports.validateJob = exports.getPrinterAttributes = exports.printJob = void 0;
var printer_1 = require("../printer/printer");
function printJob(printer, parsedBody) {
    var handledJob = new printer_1.HandledJob(printer.handledJobs, parsedBody['operation-attributes-tag']['job-name'], parsedBody['operation-attributes-tag']['requesting-user-name']);
    printer.handledJobs.push(handledJob);
    printer.emit('data', Buffer.from(parsedBody.data));
    return {
        'status-code': parsedBody.statusCode,
        'version-number': '2.0',
        'request-id': parsedBody.id,
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
    var _a, _b, _c, _d;
    var printerAttributesTag = {
        'printer-info': (_a = printer.printerOption.additional) === null || _a === void 0 ? void 0 : _a.description,
        'printer-is-accepting-jobs': true,
        'printer-location': (_b = printer.printerOption.additional) === null || _b === void 0 ? void 0 : _b.location,
        'printer-name': printer.printerOption.name,
        'printer-make-and-model': (_c = printer.printerOption.additional) === null || _c === void 0 ? void 0 : _c.makeAndModel,
        'printer-more-info': (_d = printer.printerOption.additional) === null || _d === void 0 ? void 0 : _d.moreInfo,
        'operations-supported': [
            'Print-Job',
            'Validate-Job',
            'Get-Printer-Attributes',
        ],
        'printer-state': '3',
        'printer-state-reasons': 'none',
        'compression-supported': 'none',
    };
    var data = {
        'version-number': '2.0',
        'request-id': parsedBody.id,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
        },
        'printer-attributes-tag': {},
    };
    parsedBody['operation-attributes-tag']['requested-attributes'].forEach(function (attributeName) {
        if (printerAttributesTag[attributeName]) {
            data['printer-attributes-tag'][attributeName] =
                printerAttributesTag[attributeName];
        }
    });
    return data;
}
exports.getPrinterAttributes = getPrinterAttributes;
function validateJob(printer, parsedBody) {
    return {
        'status-code': parsedBody.statusCode,
        'version-number': '2.0',
        'request-id': parsedBody.id,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
        },
    };
}
exports.validateJob = validateJob;
function getJobs(printer, parsedBody) {
    return {
        'status-code': parsedBody.statusCode,
        'version-number': '2.0',
        'request-id': parsedBody.id,
        'operation-attributes-tag': {
            'attributes-charset': 'utf-8',
            'attributes-natural-language': 'en-us',
            'status-code': 'successful',
        },
        'job-attributes-tag': {},
    };
}
exports.getJobs = getJobs;
