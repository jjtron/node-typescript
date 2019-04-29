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
        if(req.session.key) {
            // if there is already a session key, the session is regenerated
            req.session.regenerate((err) => {
                if (err) {
                    req.json({success: false, error: err});
                } else {
                    this.setUsername(req, res);
                }
            });
        } else {
            this.setUsername(req, res);
        }
    }

    setUsername(req: Request, res: Response) {
        req.session.key = { username: 'user:'+Math.random()}
        res.status(200).json({msg: "get_all_called"});    
    }
}
