import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
selector: 'app-streams',
templateUrl: './streams.component.html',
styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

	public showPng: boolean = false;
	public showText: boolean = false;
	public text: string;
	public replacementList: string = "{\"3\":\"*\"}";

	constructor(private http: HttpClient) {

	}

	ngOnInit() {
	}

	getPng() {
		this.showPng = true;
		this.showText = false;
	}

	getText() {
		this.showPng = false;
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'plain/text'
            }),
            responseType: 'text' as 'text'
        };
		this.http.post(
			"/streams/txtfile/large.txt",
			JSON.parse(this.replacementList),
			httpOptions
		).subscribe((resp) => {
			this.text = resp;
			this.showText = true;
		});
	}
}
