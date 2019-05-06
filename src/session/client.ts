import * as redis from "redis";
import { appConfig } from "../app-config";

export var client = redis.createClient({
    host: appConfig.redis_server_ip,
    port: appConfig.redis_server_port,
    db: appConfig.redis_server_db,
});