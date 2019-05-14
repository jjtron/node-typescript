import * as WebSocket from 'ws';
import * as http from "http";
import { EventEmitter } from "events";
import { logger } from "../logger";
import { reportMemoryUsage } from "../logger/memory-monitor";
import { client } from "../session/client";
import * as uuidv4 from "uuid/v4";

export function createMessage(destinationID: string, content: string, sourceID: string, isBroadcast = false): string {
    return JSON.stringify(new Message(destinationID, content, sourceID, isBroadcast));
}

export const wsEventEmitter = new EventEmitter();

export class Message {
    constructor(
        public destinationID: string,
        public content: string,
        public sourceID: string,
        public isBroadcast: boolean
    ) { }
}

interface ExtWebSocket extends WebSocket {
    sessionID: string;
    isAlive: boolean;
}

export const onConnection = (ws: WebSocket, req: http.IncomingMessage): any => {

    logger.debug('Connection made');

    const extWs = ws as ExtWebSocket;

    ws.on('close', function(code, msg) {
        logger.debug('Connection closed: ', code, msg);
        wsEventEmitter.emit('allDesinationIDs');
    });

    ws.on('error', (err) => {
        logger.debug(`Client disconnected - reason: ${err}`);
        wsEventEmitter.emit('allDesinationIDs');
    });

    ws.on('pong', () => {
        logger.debug(`${extWs.sessionID} is alive`);
        extWs.isAlive = true;
    });
    
    const id = decodeURIComponent(req.headers.cookie)
                .replace("connect.sid=s:", "")
                .split("\.")[0];

    client.keys(`sess:${id}`, function(error, keys){
        if (keys.length !== 1) {
            ws.close(4000, 'The user session cookie id was not found');
        } else {
            logger.debug('Websockit connection session cookie verified');
            extWs.sessionID = uuidv4().substring(0, 13);
            extWs.isAlive = true;
            ws.on('message', (msg: string) => {
                const msgObj: Message = JSON.parse(msg);
                if (msgObj.destinationID === extWs.sessionID) {
                    ws.send(createMessage(extWs.sessionID, msgObj.content, msgObj.sourceID));
                } else {
                    wsEventEmitter.emit(
                        "messageEvent",
                        {
                            destinationID: msgObj.destinationID,
                            content: msgObj.content,
                            sourceID: msgObj.sourceID
                        }
                    );
                }
            });
            ws.send(createMessage(extWs.sessionID, 'Log in', 'NodeJS server'));
            wsEventEmitter.emit('allDesinationIDs');
            reportMemoryUsage();
        }
    });
}
