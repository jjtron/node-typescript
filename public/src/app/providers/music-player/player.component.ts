import { Component, Input, InjectionToken, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { Artist, Song } from '../../_models/music-player.models';

export const PLAYING = new InjectionToken<Subject<Song>>("Playing");

@Component({
	selector: 'my-player',
	styleUrls: ['./player.component.css'],
	template: `
	    <div><b>Current song in play: </b>{{songPlaying}}</div>
    	<my-artist *ngFor="let artist of artists" [artist]="artist"></my-artist>
	`,
	providers: [{ provide: PLAYING, useFactory: () => new Subject<Song>() }]
})
export class PlayerComponent  {
	@Input() artists: Artist[];
	songPlaying: string = '<none>';
	constructor(@Inject(PLAYING) public playing: Subject<Song>) {
	    playing.subscribe((v) => {
	        this.songPlaying = v.name;
	    });
	}
}
