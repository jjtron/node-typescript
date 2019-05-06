import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import * as a from "../middleware";

@Controller("user")
export class UserController {

    @Get(":id")
    private get(req: Request, res: Response): any {
        return res.status(200).json({msg: req.params.id});
    }

    @Get("exists/:id")
    @Middleware([a.middleware1, a.middleware2])
    private getAll(req: Request, res: Response): any {
        return res.status(200).json({msg: "exists/" + req.params.id});
    }
}
