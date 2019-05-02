import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from 'express-session';
import { RedisSession } from "./session";
import { appConfig } from "./app-config";
import { WinstonLogger } from "./logger";
import { Server } from "@overnightjs/core";
import { UserController, AuthController } from "./controllers";
import { EventEmitter } from 'events';

class App extends Server {

    public app: express.Application;
    private logger: EventEmitter;

    constructor() {
        super();

        let winston = new WinstonLogger();
        let logger = winston.logger; 
        logger.debug('Logger in debug mode');

        let redisSession = new RedisSession();
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
                maxAge: appConfig.session_max_age
            },
            resave: false
        }));
        const userController = new UserController();
        const authController = new AuthController();
        super.addControllers([
            userController,
            authController
        ]);
    }
}

export default new App().app;
