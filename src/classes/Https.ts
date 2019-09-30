import https = require("https");

export class Https {

	public get() {
		return new Promise((resolve, reject) => {
			const req = https.request({
				hostname: "www.google.com",
			},
			(res) => {
				resolve(res);
			});
			req.on("error", (e) => {
				// do nothing for now
			});
			req.end();
		});
	}
}
