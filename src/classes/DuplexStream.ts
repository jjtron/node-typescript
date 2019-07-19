import { Duplex } from "stream";
import { logger } from "../logger";

export class DuplexStream extends Duplex {

    constructor() {
        super({});
    }
    public _write(chunk, encoding, callback) {
    	this.push(Buffer.from(chunk));
   		callback();
    }
    public _read(size) { /* do nothing */ }
}
