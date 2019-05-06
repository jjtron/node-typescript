import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import * as a from "../middleware";
import { wsEventEmitter } from "../ws";

@Controller("user")
export class UserController {

    @Get("id/:id")
    private get0(req: Request, res: Response): any {
        return res.status(200).json({msg: req.params.id});
    }

    @Get("exists/:id")
    @Middleware([a.middleware1, a.middleware2])
    private getAll(req: Request, res: Response): any {
        return res.status(200).json({msg: "exists/" + req.params.id});
    }

    @Post("external/:id")
    private post(req: Request, res: Response): any {
        wsEventEmitter.emit(
            "messageEvent",
            {
                destinationID: req.params.id,
                content: req.body.content,
                sourceID: req.body.sourceID
            }
        );
        return res.status(200).json({msg: "unprotected path"});
    }
}
