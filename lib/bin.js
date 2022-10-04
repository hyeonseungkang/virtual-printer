"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printer_1 = require("./printer/printer");
var fs_1 = require("fs");
var path_1 = require("path");
(0, fs_1.mkdirSync)((0, path_1.resolve)('output/'), { recursive: true });
var datetime = new Date().toISOString();
var printer = new printer_1.Printer({
    name: 'My Printer' + datetime,
    description: 'My Printer' + datetime,
    uri: new URL('http://0.0.0.0:5001'),
    format: ['application/postscript', 'application/pdf'],
});
printer.on('server-opened', function (error) {
    console.error(error);
});
printer.on('data', function (handledJob, data) {
    console.log(handledJob);
    (0, fs_1.writeFileSync)((0, path_1.resolve)('output/', handledJob.createdAt + '.prn'), data);
});
