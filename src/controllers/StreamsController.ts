import { Request, Response } from "express";
import { Controller, Get, Middleware, Post } from "@overnightjs/core";
import * as a from "../middleware";
import * as FS from "fs";
import { MyWritable } from "../classes";

@Controller("streams")
export class StreamsController {

    @Get("pngfile")
    private get(req: Request, res: Response): any {

        const customStream = new MyWritable({});
        let fileStream = FS.createReadStream(`${__dirname}/../assets/world.topo.bathy.200407.3x5400x2700.png`);

        res.header("Content-Type", "image/png");
        fileStream.pipe(res);

        fileStream.on("error", (err) => {
            fileStream = FS.createReadStream(`${__dirname}/../assets/error.png`);
            fileStream.pipe(res);
        });
    }
}
