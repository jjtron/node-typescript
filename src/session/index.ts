import * as redis from "redis";
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { appConfig } from "../app-config";

export class RedisSession {
    public redisStore;
    
    constructor() {
        let client = redis.createClient({
            host: appConfig.redis_server_ip,
            port: appConfig.redis_server_port,
            db: appConfig.redis_server_db
        });
        let RedisStore = connectRedis(session);
        this.redisStore = new RedisStore({
            client: client,
            ttl:  360
        });
    }
}