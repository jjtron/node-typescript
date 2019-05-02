// https://gist.github.com/williamhallatt/adaa9d14e3ac0795db723a2bf4acf794
// http://www.jyotman.xyz/post/logging-in-node.js-done-right
import { Logger, LoggerInstance, LoggerOptions, transports } from "winston";

export class WinstonLogger {
    public logger: LoggerInstance;
    constructor() {
        this.logger = new Logger({});
        this.logger.add(transports.Console, {
            colorize: true,
            showLevel: true,
            timestamp: true,
            level: "debug"
        });
    }
}
