import { Stream } from "stream";
import { logger } from "../logger";

export class MyWritable extends Stream.Writable {
    constructor(options) {
        super(options);
    }
    public _write(chunk, encoding, callback) {
        logger.info("write function called");
    }
}
