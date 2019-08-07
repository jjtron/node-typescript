import { Request, Response } from "express";
import { Controller, Get, Middleware, Post } from "@overnightjs/core";

@Controller("")
export class ExpController {

    @Get("dashboard/:frequency")
    private get2(routeRequest: Request, routeResponse: Response): any {
		routeResponse.header('Content-Type', 'application/json');
		routeResponse.send({
			success: true,
			data: {
				month: 6,
				daily: {
					studies: [6, 5, 8, 8, 5, 5, 0, 20, 23, 11, 3, 5, 10, 15, 20],
					reports: [65, 59, 80, 81, 56, 299, 40, 1, 88, 92, 22, 10, 20, 30, 60]
				},
				monthly: {
					studies: [180, 120, 236, 200, 701, 190, 140, 100, 222, 211, 29, 247, 25],
					reports: [160, 140, 206, 100, 190, 90, 240, 110, 262, 21, 28, 237, 90]
				}
			}
		});
    }

    @Get("delay-response")
    private get1(req: Request, res: Response): any {
    	const delay = req.query.delaytime;
		setTimeout(() => {
			res.header('Content-Type', 'plain/text');
			res.send('response delayed by ' + delay + ' milliseconds');
		}, delay);
    }
}
