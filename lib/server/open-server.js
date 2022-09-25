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
function openServer(printer) {
    printer.server.addContentTypeParser('application/ipp', function (request, payload, done) {
        var data = '';
        payload.on('data', function (chunk) { return (data += chunk); });
        payload.on('end', function () {
            done(null, ipp.parse(Buffer.from(data)));
        });
    });
    printer.server.post('/printer/:id', function (request, reply) {
        console.log(request.body);
        reply.header('Content-Type', 'application/ipp');
        reply.send(null);
    });
    printer.server.post('/', function (request, reply) {
        var body = request.body;
        reply.header('Content-Type', 'application/ipp');
        if (body.operation === 'Print-Job') {
            var data = (0, handle_request_1.printJob)(printer, body);
            reply.send(data);
        }
        else {
            var data = {};
            switch (body.operation) {
                case 'Get-Jobs':
                    data = (0, handle_request_1.getJobs)(printer, body);
                    break;
                case 'Get-Printer-Attributes':
                    data = (0, handle_request_1.getPrinterAttributes)(printer, body);
                    break;
                case 'Validate-Job':
                    data = (0, handle_request_1.validateJob)(printer, body);
                    break;
                default: {
                    data = {
                        id: body.id,
                        version: '2.0',
                        statusCode: 'server-error-operation-not-supported',
                    };
                    break;
                }
            }
            return reply.send(ipp.serialize(data));
        }
    });
    printer.server.listen({ port: printer.printerOption.port, host: printer.printerOption.host }, function (err) {
        printer.emit('serverStart', err);
    });
    var responder = (0, ciao_1.getResponder)();
    var service = responder.createService({
        name: printer.printerOption.name,
        type: 'ipp',
        port: printer.printerOption.port,
    });
    return service.advertise().then(function () {
        printer.emit('bonjourPublish');
    });
}
exports.openServer = openServer;
