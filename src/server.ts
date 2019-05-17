/**
 * Module dependencies.
 */
import app from "./app";
import * as http from "http";
import { logger } from "./logger";
import * as WebSocket from "ws";
import { appConfig } from "./app-config";
import { WebSocketServerSetup } from "./wss";

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
const options = appConfig.wssOptions;
options.server = server;

const wss: any = new WebSocket.Server(options);
WebSocketServerSetup(wss);

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
