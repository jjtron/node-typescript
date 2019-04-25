import * as express from "express";
import { Request, Response } from "express";

class Router {

    public router: any;

	constructor() {
		this.routes();
	}

    private routes(): void {
        this.router = express.Router();
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).send({
                message: 'Hello New Nodejs Server!'
            })
        });

        this.router.post('/', (req: Request, res: Response) => {
            const data = req.body;
            res.status(200).send(data);
        });
    }
}

export default new Router().router;
