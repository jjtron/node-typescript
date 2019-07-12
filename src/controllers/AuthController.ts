import { Request, Response } from "express";
import { Controller, Get, Post } from "@overnightjs/core";
import { appConfig } from "../app-config";
import { IExtRequest } from "../interfaces";

@Controller("")
export class AuthController {

    @Post("auth")
    private post(req: Request, res: Response): void {
        const extRequest = req as IExtRequest;
        if (extRequest.session.key) {
            // if there is already a session key, the session is regenerated
            extRequest.session.regenerate((err: any) => {
                if (err) {
                    extRequest.json({success: false, error: err});
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
        const extRequest = req as IExtRequest;
        extRequest.session.key = { username: "user:" + Math.random()};
        res.status(200).json({sessionID: extRequest.sessionID});
    }
}
