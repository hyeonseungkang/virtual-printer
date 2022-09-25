"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = exports.HandledJob = void 0;
var open_server_1 = require("../server/open-server");
var fastify_1 = __importDefault(require("fastify"));
var tiny_typed_emitter_1 = require("tiny-typed-emitter");
var HandledJob = /** @class */ (function () {
    function HandledJob(handledJobs, jobName, jobOriginatingUserName) {
        this['job-state'] = 9;
        this.createdAt = Date.now();
        this['job-id'] = handledJobs.length + 1;
        this['job-name'] = jobName;
        this['job-originating-user-name'] = jobOriginatingUserName;
    }
    return HandledJob;
}());
exports.HandledJob = HandledJob;
var Printer = /** @class */ (function (_super) {
    __extends(Printer, _super);
    function Printer(printerOption) {
        var _this = _super.call(this) || this;
        _this.printerOption = {
            port: 3000,
            name: 'IPP Printer created by NodeJS',
            host: '0.0.0.0',
            additional: {
                description: 'IPP Printer created by NodeJS',
                location: 'localhost',
                makeAndModel: 'Generic PostScript Printer',
                moreInfo: 'http://localhost:3000',
            },
        };
        _this.handledJobs = [];
        _this.started = Date.now();
        _this.server = (0, fastify_1.default)();
        printerOption = __assign(__assign({}, printerOption), { additional: __assign(__assign({}, _this.printerOption), printerOption === null || printerOption === void 0 ? void 0 : printerOption.additional) });
        _this.printerOption = __assign(__assign({}, _this.printerOption), printerOption);
        (0, open_server_1.openServer)(_this);
        return _this;
    }
    return Printer;
}(tiny_typed_emitter_1.TypedEmitter));
exports.Printer = Printer;
