"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandledJob = void 0;
var HandledJob = /** @class */ (function () {
    function HandledJob(handledJobs, jobName, jobOriginatingUserName) {
        this['job-state'] = 9;
        this.createdAt = Date.now();
        this['job-id'] = handledJobs.length + 1;
        this['job-name'] = jobName || 'job ' + new Date().toISOString();
        this['job-originating-user-name'] = jobOriginatingUserName || 'anonymous';
    }
    return HandledJob;
}());
exports.HandledJob = HandledJob;
