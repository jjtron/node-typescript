import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
    title = 'BackEnd: NodeJS FrontEnd: Ng';
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.http.get('/api').subscribe(() => {

        });
    }
}
