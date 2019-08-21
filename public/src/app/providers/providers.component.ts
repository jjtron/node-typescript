import { Component, OnInit } from '@angular/core';
import { MyProviderService } from './my-provider.service';
import { LIBRARY } from '../_models/music-player.models';

@Component({
	selector: 'app-providers',
	templateUrl: './providers.component.html',
	styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

	todos = ["Stop using TODO examples", "???", "Profit!"];
	library = LIBRARY;

	constructor(myProvider: MyProviderService) {

	}

	ngOnInit() {
	}

}
