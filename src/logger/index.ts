// https://gist.github.com/williamhallatt/adaa9d14e3ac0795db723a2bf4acf794
// http://www.jyotman.xyz/post/logging-in-node.js-done-right
import { Logger, LoggerInstance, LoggerOptions, transports } from "winston";
import { appConfig } from "../app-config";

const logger: LoggerInstance = new Logger({});
logger.add(transports.Console, {
    colorize: true,
    showLevel: true,
    timestamp: true,
    level: appConfig.loglevel,
});
logger.debug("Logger initialized in debug mode");

export { logger };
