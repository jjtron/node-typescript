export const appConfig = {
    redis_server_ip: "localhost",
    redis_server_port: 6379,
    redis_server_db: 0,
    redis_server_ttl: 3600,
    redis_server_password: "anything",

    public_dist_folder: "/../public/dist",

    session_max_age: 60 * 60 * 12 * 1000,

    loglevel: "debug",
};
