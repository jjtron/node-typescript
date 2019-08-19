import * as WebSocket from "ws";
import { Request, Express } from "express";

export interface IExtWebSocket extends WebSocket {
    sessionID: string;
    isAlive: boolean;
}

export interface IExtRequest extends Request {
    session: { key: any; regenerate: (err: any) => {}; };
    sessionID: string;
    json: (obj: any) => {};
}
