const winston = require('winston');
const { createLogger, format, transports } = winston;

export const logger = createLogger({
transports: [
    new transports.File({
    filename: './logs/log.txt',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
        new transports.Console({
            format:format.combine(
                format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
                format.align(),
                format.printf(info => `${info.level}: ${[info.timestamp]}:\n  ${info.message}`),
            )})
    ]
});

winston.add(logger)
