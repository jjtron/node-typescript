import { Component, Input } from '@angular/core';

import { Artist, Song } from '../../_models/music-player.models';

@Component({
	selector: 'my-artist',
	styleUrls: ['./player.component.css'],
	template: `
    	<clr-icon shape="user" class="is-solid"></clr-icon>
    	{{artist.name}}

    	<my-album *ngFor="let album of artist.albums" [album]="album"></my-album>
	`
})
export class ArtistComponent {
	@Input() artist: Artist;
}
