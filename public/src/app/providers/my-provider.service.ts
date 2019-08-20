import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyProviderService {

  constructor() {
	  console.info('hello my provider');
  }
}
