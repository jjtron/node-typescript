import { Component, OnInit } from '@angular/core';
import { MyProviderService } from './my-provider.service';

@Component({
selector: 'app-providers',
templateUrl: './providers.component.html',
styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

	todos = ["Stop using TODO examples", "???", "Profit!"];

	constructor(myProvider: MyProviderService) {

	}

	ngOnInit() {
	}

}
