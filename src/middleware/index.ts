import { logger } from "../logger";

export function middleware1(req, res, next) {
    logger.debug("I am some middleware 1"); next();
}

export function middleware2(req, res, next) {
    logger.debug("I am some middleware 2"); next();
}
