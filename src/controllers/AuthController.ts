import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import * as a from "../middleware";
import { wsEventEmitter } from "../ws";
import { appConfig } from "../app-config";

@Controller("")
export class AuthController {

    @Post("auth")
    private post(req: Request, res: Response): void {
        if (req.session.key) {
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

    @Get("wss")
    private get(req: Request, res: Response): any {
        return res.status(200).json(appConfig.wss);
    }
    
    private setUsername(req: Request, res: Response) {
        req.session.key = { username: "user:" + Math.random()};
        res.status(200).json({sessionID: req.sessionID});
    }
}
