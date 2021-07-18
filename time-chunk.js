"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNITS = exports.TimeChunk = void 0;
var TimeChunk = /** @class */ (function () {
    function TimeChunk(startTime, endTime) {
        if (endTime === void 0) { endTime = Date.now(); }
        this.startTime = startTime;
        this.endTime = endTime;
    }
    TimeChunk.prototype.chunk = function (interval, unit) {
        if (unit === void 0) { unit = UNITS.MILLIONSECOND; }
        var chunks = [];
        for (var currTime = this.startTime; currTime < this.endTime;) {
            var next = this._add(currTime, interval, unit);
            chunks.push({
                start: currTime,
                end: Math.min(next, this.endTime) - 1,
            });
            currTime = next;
        }
        return chunks;
    };
    TimeChunk.prototype._add = function (time, interval, unit) {
        return this[unit](time, interval);
    };
    TimeChunk.prototype._addMillionSecond = function (time, interval) {
        return time + interval;
    };
    TimeChunk.prototype._addSeconde = function (time, interval) {
        return time + interval * 1000;
    };
    TimeChunk.prototype._addMinute = function (time, interval) {
        return time + interval * 1000 * 60;
    };
    TimeChunk.prototype._addHour = function (time, interval) {
        return time + interval * 1000 * 60 * 60;
    };
    TimeChunk.prototype._addDay = function (time, interval) {
        return time + interval * 1000 * 60 * 60 * 24;
    };
    TimeChunk.prototype._addWeek = function (time, interval) {
        return time + interval * 1000 * 60 * 60 * 24 * 7;
    };
    TimeChunk.prototype._addMonth = function (time, interval) {
        return new Date(new Date(time).setMonth(new Date(time).getMonth() + interval)).getTime();
    };
    TimeChunk.prototype._addYear = function (time, interval) {
        return new Date(new Date(time).setFullYear(new Date(time).getFullYear() + interval)).getTime();
    };
    return TimeChunk;
}());
exports.TimeChunk = TimeChunk;
var UNITS;
(function (UNITS) {
    UNITS["MILLIONSECOND"] = "_addMillionSecond";
    UNITS["SECOND"] = "_addSeconde";
    UNITS["MINUTE"] = "_addMinute";
    UNITS["HOUR"] = "_addHour";
    UNITS["DAY"] = "_addDay";
    UNITS["WEEK"] = "_addWeek";
    UNITS["MONTH"] = "_addMonth";
    UNITS["YEAR"] = "_addYear";
})(UNITS = exports.UNITS || (exports.UNITS = {}));
