"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var printer_1 = require("./printer/printer");
var printer = new printer_1.Printer();
printer.on('bonjourPublish', function () { return console.log('hi'); });
printer.on('data', function (handledJob, data) { });
