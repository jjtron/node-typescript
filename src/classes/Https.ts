import https = require('https');

export class Https {
	
	public get() {
		return new Promise((resolve, reject) => {
			const req = https.request({
				hostname: "www.google.com"
			},
			(res) => {
				resolve(res);
				/*
				let httpResponseBody = '';
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
					httpResponseBody += chunk;
				}
				);
				res.on('end', () => {
					if (res.statusCode === 200) {
						resolve(httpResponseBody);
					}
					else {
						
					}
				});
				*/
			});
			req.on('error', (e) => {
				
			});
			req.end();
		});
	}
}
