import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { logger } from "../logger";
import { client } from "./client";

export class RedisSession {
    public redisStore;

    constructor() {
        client.on("error", (err) => {
            logger.error(err);
            process.exit();
        });
        client.on("ready", () => {
            logger.debug("Redis is running");
        });
        const RedisStore = connectRedis(session);
        this.redisStore = new RedisStore({
            client: client,
            ttl:  360,
        });
    }
}
