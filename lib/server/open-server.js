"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openServer = void 0;
var ipp = __importStar(require("ipp"));
var handle_request_1 = require("./handle-request");
var ciao_1 = require("@homebridge/ciao");
var parsed_body_1 = require("./interfaces/parsed-body");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
var ippEncoder = __importStar(require("ipp-encoder"));
function openServer(printer) {
    printer.server.addContentTypeParser('application/ipp', function (request, payload, done) {
        var data = [];
        payload.on('data', function (chunk) {
            data.push(Buffer.from(chunk));
        });
        payload.on('end', function () {
            done(null, data);
        });
    });
    printer.server.post('/printer/:id', function (request, reply) {
        reply.header('Content-Type', 'application/ipp');
        reply.send(null);
    });
    printer.server.post('/', function (request, reply) {
        var buffers = request.body;
        var body = ippEncoder.request.decode(buffers[0]);
        reply.header('Content-Type', 'application/ipp');
        if (body.operationId === parsed_body_1.Constants.PRINT_JOB) {
            var data = (0, handle_request_1.printJob)(printer, body, buffers);
            reply.send(data);
        }
        else {
            var data = void 0;
            switch (body.operationId) {
                case parsed_body_1.Constants.GET_JOBS:
                    data = (0, handle_request_1.getJobs)(printer, body);
                    break;
                case parsed_body_1.Constants.GET_PRINTER_ATTRIBUTES:
                    data = (0, handle_request_1.getPrinterAttributes)(printer, body);
                    break;
                case parsed_body_1.Constants.VALIDATE_JOB:
                    data = (0, handle_request_1.validateJob)(printer, body);
                    break;
                default: {
                    data = {
                        id: body.requestId,
                        version: '2.0',
                        statusCode: 'server-error-operation-not-supported',
                    };
                    break;
                }
            }
            reply.send(ipp.serialize(data));
        }
    });
    printer.server.listen({
        port: Number(printer.printerOption.uri.port),
        host: printer.printerOption.uri.hostname,
    }, function (error) {
        printer.emit('server-opened', error);
    });
    if (printer.printerOption.bonjour) {
        var responder = (0, ciao_1.getResponder)();
        var service = responder.createService({
            name: printer.printerOption.name,
            type: !printer.printerOption.security ? 'ipp' : 'ipps',
            port: Number(printer.printerOption.uri.port),
        });
        service.on("name-change" /* ServiceEvent.NAME_CHANGED */, function (name) {
            printer.printerOption.name = name;
            printer.emit('bonjour-name-change', name);
        });
        service.on("hostname-change" /* ServiceEvent.HOSTNAME_CHANGED */, function (name) {
            return printer.emit('bonjour-hostname-change', name);
        });
        return service.advertise().then(function () { return printer.emit('bonjour-published'); });
    }
}
exports.openServer = openServer;
