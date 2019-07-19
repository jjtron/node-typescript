import { Request, Response } from "express";
import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import * as a from "../middleware";
import * as FS from "fs";
import { DuplexStream } from "../classes";
import { logger } from "../logger";

@Controller("streams")
export class StreamsController {

	@Post("txtfile/:filename")
	private post(req: Request, res: Response): any {
		this.processRequest (req, res);
	}

	@Get("pngfile/:filename")
	private get(req: Request, res: Response): any {
		this.processRequest (req, res);
	}

	private processRequest(req: Request, res: Response): any {
		const filename = req.params.filename;
		const duplexStream = new DuplexStream();

		if (filename.split(".")[1] === "txt") {
			// if the request is for a text file
			const replacementList = req.body;
			duplexStream.replaceCharsFn = (chunk: Buffer) => {
				Object.keys(replacementList).forEach((key) => {
			    	const iArray: number[] = [];
			    	chunk.forEach((el, i) => {
			    		if (el === key.charCodeAt(0)) {
			    			iArray.push(i);
			    		}
			    	});
			    	iArray.forEach((i) => {
			    		chunk.fill(replacementList[key], i, i + 1);
			    	});
				});
				return chunk;
			};
			// do not know why,
			// but 'res.end()' must be called when file is text
			duplexStream.on("finish", () => {
				process.nextTick(() => {
					res.end();
				});
			});
		} else {
			// if the request is for a png file
			duplexStream.replaceCharsFn = (chunk: Buffer) => chunk;
		}

		const fileStream = FS.createReadStream(`${__dirname}/../assets/${filename}`);

		duplexStream.once("readable", () => {
			if (filename.split(".")[1] === "txt") {
				res.header("Content-Type", "plain/text");
			} else {
				res.header("Content-Type", "image.png");
			}
			duplexStream.pipe(res);
		});

		fileStream.pipe(duplexStream);
	}
}
