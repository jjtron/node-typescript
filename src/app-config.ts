import { logger } from "./logger";

const unprotectedPaths = [
    "/auth",
    "/wss",
    "/user/external/:id",
    "/streams/pngfile",
];

const protectedPaths = [
    "/user/id/:id",
    "/user/exists/:id",
];

const securePathsPattern = "^" + protectedPaths.join("|");

const unprotectedPathsPattern = "^" + unprotectedPaths.join("|");

function regExDetails(pattern: string) {
    const completePattern = pattern.replace(/\//g, "\\/")
        .replace(/(\:([a-z])*?\|)/g, ".+|")
        .replace(/(\/\:([a-z])[^\|]*?\/)/g, "/\.+\\/")
        .replace(/(\/\:([a-z])*)$/, "/.+")
        .replace(/\*/g, ".+")
        .replace(/\|/g, "$\|^") + "$";
    return completePattern;
}

export const appConfig = {
    origin: "https://test217.m2-corp.com",
    wss: "wss://test217.m2-corp.com/ngws",

    redis_server_ip: "localhost",
    redis_server_port: 6379,
    redis_server_db: 0,
    redis_server_ttl: 3600,
    redis_server_password: "anything",

    public_dist_folder: "/../public/dist",

    session_max_age: 60 * 60 * 12 * 1000,

    loglevel: "debug",

    unprotectedPathsPattern: regExDetails(unprotectedPathsPattern),

    securePathsPattern: regExDetails(securePathsPattern),

    wsPingInterval: 60000,

    wssOptions: {
        server: null,
        verifyClient: (info: any) => {
            logger.debug(`WebSocket Server verifyClient function`);
            // check origin
            if (info.origin !== appConfig.origin && info.origin !== "http://localhost:4200") {
                return false;
            }
            // check pattern of session cookie
            if (!/^connect\.sid=s.+\..+$/.test(info.req.headers.cookie)) {
                return false;
            }
            return true;
        },
        maxPayload: 200,
    },
};
