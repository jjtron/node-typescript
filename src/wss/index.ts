/**
 * Websocket Server Setup
 */
import { onConnection, createMessage, wsEventEmitter, Message } from "../ws";
import * as WebSocket from "ws";
import { appConfig } from "../app-config";
import { logger } from "../logger";
import { IExtWebSocket } from "../interfaces";

export function WebSocketServerSetup(wss: any) {
    // WebSocket Server on connection
    wss.on("connection", onConnection);

    // External event response on "messageEvent"
    wsEventEmitter.on("messageEvent", (msg: Message) => {
        wss.clients.forEach((client: IExtWebSocket) => {
            if (client.sessionID && client.readyState === WebSocket.OPEN && client.sessionID === msg.destinationID) {
                client.send(createMessage(msg.destinationID, msg.content, msg.sourceID));
            }
        });
    });

    // update all clients with a list of all desination IDs
    wsEventEmitter.on("allDesinationIDs", () => {
        const allDestinationIDs = [];
        wss.clients.forEach((client: IExtWebSocket) => {
            if (client.sessionID && client.readyState === WebSocket.OPEN) {
                allDestinationIDs.push(client.sessionID);
            }
        });
        wss.clients.forEach((client: IExtWebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                const i: number = allDestinationIDs.indexOf(client.sessionID);
                const out: string[] = allDestinationIDs.slice(0, i).concat(allDestinationIDs.slice(i + 1));
                client.send(JSON.stringify(out));
            }
        });
    });

    // ping all clients at regular interval; terminate client when dead
    setInterval(() => {
        wss.clients.forEach((client: IExtWebSocket) => {
            if (!client.isAlive) {
                logger.debug(`${client.sessionID} is dead`);
                return client.terminate();
            }
            client.isAlive = false;
            client.ping(null, false);
        });
    }, appConfig.wsPingInterval);
}
