import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

// using `providedIn: 'root'`, so this does not have to be added to the app.module providers[]
@Injectable({
  providedIn: 'root'
})
export class DemoResolver implements Resolve<Observable<any>> {

  constructor(private http: HttpClient) {}

  resolve() {
	return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}