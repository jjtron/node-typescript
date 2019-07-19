import { Duplex } from "stream";
import { logger } from "../logger";

export class DuplexStream extends Duplex {

	public replaceCharsFn: (chunk: Buffer) => Buffer;

    constructor() {
        super({});
    }
    public _write(chunk, encoding, callback) {
    	// modify the contents per supplied replaceCharsFn function
		const modifiedChunk = this.replaceCharsFn(chunk);
		this.push(Buffer.from(modifiedChunk));
		callback();
    }
    public _read(size) { /* do nothing */ }
}
