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
exports.Printer = void 0;
var open_server_1 = require("../server/open-server");
var fastify_1 = __importDefault(require("fastify"));
var tiny_typed_emitter_1 = require("tiny-typed-emitter");
var Printer = /** @class */ (function (_super) {
    __extends(Printer, _super);
    function Printer(options) {
        var _this = _super.call(this) || this;
        _this.printerOption = {
            serverUrl: new URL('http://0.0.0.0:3000'),
            printerUriSupported: new URL('ipp://0.0.0.0:3000'),
            name: 'Printer',
            description: 'IPP Printer created by NodeJS',
            location: '0.0.0.0',
            moreInfo: new URL('ipp://0.0.0.0:3000'),
            security: false,
            format: ['application/postscript'],
            bonjour: true,
        };
        _this.handledJobs = [];
        _this.startedAt = new Date();
        _this.server = (0, fastify_1.default)();
        _this.printerOption = __assign(__assign({}, _this.printerOption), options);
        if (!_this.printerOption.serverUrl.port)
            _this.printerOption.serverUrl.port = '3000';
        if (!_this.printerOption.printerUriSupported.port)
            _this.printerOption.printerUriSupported.port = '3000';
        !_this.printerOption.security
            ? (_this.printerOption.printerUriSupported.protocol = 'ipp')
            : (_this.printerOption.printerUriSupported.protocol = 'ipps');
        (0, open_server_1.openServer)(_this);
        return _this;
    }
    return Printer;
}(tiny_typed_emitter_1.TypedEmitter));
exports.Printer = Printer;
