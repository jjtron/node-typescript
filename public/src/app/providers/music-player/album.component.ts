import { Component, Input } from '@angular/core';

import { Album } from '../../_models/music-player.models';

@Component({
	selector: 'my-album',
	styleUrls: ['./player.component.css'],
	template: `
    	<clr-icon shape="disk" class="is-solid"></clr-icon>
    	{{album.name}}

    	<my-song *ngFor="let song of album.songs" [song]="song"></my-song>
	`
})
export class AlbumComponent {
	@Input() album: Album;
}
