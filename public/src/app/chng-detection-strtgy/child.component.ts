import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'child-component',
  template: `
	<div *ngIf="newItem">The last item added was : {{newItem}}</div>
	<div *ngIf="!newItem">&nbsp;</div>
	<ul>
		<li *ngFor="let item of data">{{ item }}</li>
	</ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() data: string[];
  @Input() newItem: string;
}
