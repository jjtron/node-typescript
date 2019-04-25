import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import router from "./routes";

class App {

  constructor() {
    this.app = express();
    this.config();
    this.app.use('/', router);
  }

  public app: express.Application;

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

}

export default new App().app;
