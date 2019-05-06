import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as parseUrl from "parseurl";
import { RedisSession } from "./session";
import { appConfig } from "./app-config";
import { logger } from "./logger";
import { Server } from "@overnightjs/core";
import { UserController, AuthController } from "./controllers";
import { EventEmitter } from "events";

class App extends Server {

    public app: express.Application;

    constructor() {
        super();
        logger.debug("App construct");
        const redisSession = new RedisSession();
        this.app.use(express.static(__dirname + appConfig.public_dist_folder));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({
            secret: appConfig.redis_server_password,
            store: redisSession.redisStore,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: appConfig.session_max_age,
            },
            resave: false,
        }));
        this.app.use((req, res, next) => {
            const securePathsPattern = new RegExp(appConfig.securePathsPattern);
            const path = parseUrl(req).pathname;
            if (securePathsPattern.test(path)) {
                const errorMsg = `Call to protected path without session key: '${path}'`;
                logger.debug(errorMsg);
                if (!req.session.key) { throw errorMsg; }
            } else if (appConfig.unprotectedPaths.indexOf(path) >= 0) {
                logger.debug(`Call to un-protected path: '${path}'`);
            } else {
                const errorMsg = `Call to un-known path: '${path}'`;
                logger.debug(errorMsg);
                if (!req.session.key) { throw errorMsg; }
            }
            next();
        });
        this.app.use((err, req, res, next) => {
            res.statusCode = 400;
            res.send(err);
        });
        const userController = new UserController();
        const authController = new AuthController();
        super.addControllers([
            userController,
            authController,
        ]);
    }
}

export default new App().app;
