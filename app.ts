import * as express from "express";
import * as bodyParser from "body-parser";
import { Server } from '@overnightjs/core'
import { UserController } from './UserController'

class App extends Server {

    public app: express.Application;

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        let userController = new UserController();
        super.addControllers([userController]);
    }
}

export default new App().app;
