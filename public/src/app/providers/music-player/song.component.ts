import { Component, Input, HostBinding, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { Song } from '../../_models/music-player.models';
import { PLAYING } from './player.component';

@Component({
	selector: 'my-song',
	styleUrls: ['./player.component.css'],
	template: `
    	<button (click)="playing.next(song)">
      		<clr-icon [attr.shape]="isPlaying ? 'play' : 'music-note'" class="is-solid"></clr-icon>
      		{{song.name}}
    	</button>
	`
})
export class SongComponent {
	@Input() song: Song;

	constructor(@Inject(PLAYING) public playing: Subject<Song>) {
		playing.subscribe(current => this.isPlaying = (current === this.song));
	}

	@HostBinding('class.playing') isPlaying: boolean = false;
}
