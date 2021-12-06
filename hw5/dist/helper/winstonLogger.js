'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var winston = require('winston');
var createLogger = winston.createLogger,
    format = winston.format,
    transports = winston.transports;
var logger = exports.logger = createLogger({
    transports: [new transports.File({
        filename: './logs/log.txt',
        format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(), format.printf(function (info) {
            return info.level + ': ' + [info.timestamp] + ': ' + info.message;
        })) }), new transports.Console({
        format: format.combine(format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), format.align(), format.printf(function (info) {
            return info.level + ': ' + [info.timestamp] + ':\n  ' + info.message;
        })) })]
});

winston.add(logger);