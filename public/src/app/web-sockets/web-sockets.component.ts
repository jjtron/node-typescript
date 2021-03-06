import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';
import { Router } from '@angular/router';

export class Message {
    constructor(
        public destinationID: string,
        public content: string,
        public sourceID: string,
        public isBroadcast: boolean
    ) { }
}

@Component({
  selector: 'app-web-sockets',
  templateUrl: './web-sockets.component.html',
  styleUrls: ['./web-sockets.component.css']
})
export class WebSocketsComponent implements OnInit {

    public title = 'BackEnd: NodeJS, FrontEnd: Angular';
    private socket$;
    public clientMessage;
    public isBroadcast = false;
    private wss: any;
    public wsId: string;
    public msgSourceId: string;
    public msgContent: string;
    public socketStatus = 'Closed';
    public userMessage: string;
    public destinationID: string;
    public destinationIDs: string[];

    constructor(private http: HttpClient, private router: Router) {
    }

  ngOnInit() {
      new Promise((resolve, reject) => {
          this.http.get('/wss').subscribe(resp => {
              this.wss = resp;
              resolve(true);
          });
      })
      .then(() => {
          this.http.post('/auth', {}).subscribe((resp: { sessionID: string; } ) => {
              if (location.protocol === 'http:') {
                  this.socket$ = webSocket('ws://localhost:8001');
              } else {
                  this.socket$ = webSocket(this.wss);
              }
              this.socket$.subscribe(
                  (response: Message | string[]) => {
                      if (this.isMessage(response)) {
                          this.wsId = response.destinationID;
                          this.msgContent = response.content;
                          this.msgSourceId = response.sourceID;
                          this.socketStatus = 'Open';
                          document.getElementById('tab-title').innerHTML = this.wsId;
                      } else {
                          this.destinationIDs = response;
                      }
                  },
                  (err) => console.error(err),
                  () => {
                      this.socketStatus = 'Closed';
                      this.msgContent = '';
                      this.msgSourceId = '';
                      this.destinationIDs = [];
                  }
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

  isMessage(toBeDetermined: any): toBeDetermined is Message {
      if ((toBeDetermined as Message ).content) {
          return true;
      }
      return false;
  }

}
