import * as WebSocket from "ws";

export interface IExtWebSocket extends WebSocket {
    sessionID: string;
    isAlive: boolean;
}
