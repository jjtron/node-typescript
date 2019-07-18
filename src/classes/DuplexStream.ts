import { Duplex } from "stream";
import { logger } from "../logger";

export class DuplexStream extends Duplex {

	public name;
	public readCount = 0;
	public readCountMax;
	private storageArray: Buffer[] = [];

    constructor(options, name) {
        super(options);
        this.name = name;
    }
    public _write(chunk, encoding, callback) {
		this.storageArray.push(Buffer.from(chunk));
		this.readCountMax = this.storageArray.length;
		callback();
    }
    public _read(size) {
    	if (this.readCount <= this.readCountMax) {
    		this.push(this.storageArray[this.readCount]);
    	} else {
    		logger.info(this.name + " read buffer no longer being pushed onto with readcount = " + this.readCount);
    	}
    	this.readCount++;
    }
}
