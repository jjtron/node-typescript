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

		const asReadableName = "asReadable";
		const asReadable = new DuplexStream({}, asReadableName);
		const fileStream = FS.createReadStream(`${__dirname}/../assets/world.topo.bathy.200407.3x5400x2700.png`);

		fileStream.on("data", (chunk) => {
			this.writeDateToDuplex(
				asReadable,
				chunk,
				"binary",
				() => {
					// do nothing for now
				},
			);
		});

		fileStream.on("end", () => {
			asReadable.end();
			res.on("pipe", () => {
				logger.info("response object has been piped");
			});
			res.header("Content-Type", "image/png");
			asReadable.pipe(res);
		});
	}

	private writeDateToDuplex(writer, data, encoding, callback) {
		writer.write(data, encoding, callback);
	}
}
