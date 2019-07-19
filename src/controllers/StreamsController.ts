import { Request, Response } from "express";
import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import * as a from "../middleware";
import * as FS from "fs";
import { DuplexStream } from "../classes";
import { logger } from "../logger";

@Controller("streams")
export class StreamsController {

	@Get("pngfile")
	private get(req: Request, res: Response): any {

		const duplexStream = new DuplexStream();
		const fileStream = FS.createReadStream(`${__dirname}/../assets/world.topo.bathy.200407.3x5400x2700.png`);

		duplexStream.once("readable", () => {
			res.header("Content-Type", "image/png");
			duplexStream.pipe(res);
		});

		fileStream.pipe(duplexStream);
	}
}
