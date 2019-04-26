import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import * as a from "./middleware";

@Controller("api")
export class UserController {

    @Get(":id")
    private get(req: Request, res: Response): any {
        return res.status(200).json({msg: req.params.id});
    }

    @Get()
    @Middleware([a.middleware1, a.middleware2])
    private getAll(req: Request, res: Response): void {
        res.status(200).json({msg: "get_all_called"});
    }
}
