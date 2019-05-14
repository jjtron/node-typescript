/**
 * Module dependencies.
 */
import app from "./app";
import * as http from "http";
import { logger } from "./logger";
import { onConnection, createMessage, wsEventEmitter, Message } from "./ws";
import * as WebSocket from "ws";
import { appConfig } from "./app-config";

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || "8001");
app.set("port", port);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => { logger.debug(`Listening on port ${port}`); });
server.on("error", onError);

/**
 * Set up the Websocket Server
 */
const wss: any = new WebSocket.Server(
    {
        server: server,
        verifyClient: (info) => {
            logger.debug(`WebSocket Server verifyClient function`);
            // check origin
            if (info.origin !== appConfig.origin && info.origin !== 'http://localhost:4200') {
                return false;
            }
            // check pattern of session cookie
            if (!/^connect\.sid=s.+\..+$/.test(info.req.headers.cookie)) {
                return false;
            }
            return true;
        },
        maxPayload: appConfig.wsMaxPaylod
});

// WebSocket Server on connection
wss.on("connection", onConnection);

// External event response on "messageEvent"
wsEventEmitter.on("messageEvent", (msg: Message) => {
    wss.clients.forEach(client => {
        if (client.sessionID && client.sessionID === msg.destinationID) {
            client.send(createMessage(msg.destinationID, msg.content, msg.sourceID));
        }
    });
});
// update all clients with a list of all desination IDs
wsEventEmitter.on("allDesinationIDs", () => {
    let allDestinationIDs = [];
    wss.clients.forEach(client => {
        if (client.sessionID) {
            allDestinationIDs.push(client.sessionID);
        }
    });
    wss.clients.forEach(client => {
        const i: number = allDestinationIDs.indexOf(client.sessionID);
        const out: string[] = allDestinationIDs.slice(0, i).concat(allDestinationIDs.slice(i + 1));
        client.send(JSON.stringify(out));
    });
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
