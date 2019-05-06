import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { webSocket } from "rxjs/webSocket";

export class Message {
    constructor(
        public destinationID: string,
        public content: string,
        public sourceID: string,
        public isBroadcast: boolean
    ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

    public title = 'BackEnd: NodeJS, FrontEnd: Angular';
    private socket$;
    public clientMessage;
    public isBroadcast = false;
    private wss: any;
    public wsId: string;
    public msgSourceId: string;
    public msgContent: string;
    public socketStatus: string = "Closed";
    public userMessage: string;
    public destinationID: string;

    constructor(private http: HttpClient) {
    }
    ngOnInit() {
        new Promise((resolve, reject) => {
            this.http.get('/wss').subscribe(resp => {
                this.wss = resp;
                resolve(true);
            });
        })
        .then(() => {
            this.http.post('/auth', {}).subscribe((resp: {sessionID: string;}) => {
                if (location.protocol === 'http:') {
                    this.socket$ = webSocket('ws://localhost:8001');
                } else {
                    this.socket$ = webSocket(this.wss);
                }
                this.socket$.subscribe(
                    (message: Message) => {
                        this.wsId = message.destinationID;
                        this.msgContent = message.content;
                        this.msgSourceId = message.sourceID;
                        this.socketStatus = "Open";
                    },
                    (err) => console.error(err),
                    () => this.socketStatus = "Closed"
                );
            });
        });
    }

    public close(): void {
        this.socket$.complete();
    }

    public send(): void {
        this.destinationID = (!this.destinationID) ? this.wsId : this.destinationID;
        const message = new Message(this.destinationID, this.clientMessage, this.wsId, this.isBroadcast);
        this.socket$.next(message);
        this.clientMessage = '';
    }

    public keyDown(e) {
        if (e.keyCode === 13) {
            this.send();
        } else {
            this.destinationID = (!this.destinationID) ? this.wsId : this.destinationID;
        }
    }

    public sendViaHttp(): void {
        this.http.post(
            `/user/external/${this.destinationID}`,
            {
                content: this.clientMessage,
                sourceID: this.wsId
            }
        ).subscribe(() => {

        });
    }
}
