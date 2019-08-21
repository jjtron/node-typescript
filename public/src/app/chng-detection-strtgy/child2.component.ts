import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'child2-component',
  template: `
	<div>Added foods</div>
	<ul>
		<li *ngFor="let item of foods">{{ item }}</li>
	</ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child2Component {
  @Input() data: BehaviorSubject<string>;
  foods: string[] = [];
  
  constructor(private cd: ChangeDetectorRef) {}
  
  ngOnInit() {
	  this.data.subscribe((food: string) => {
	  	if (food) {
			// This works because it is NOT the foods array that cares,
			// it is the '@Input() data' that cares whether or not it is mutated vs just changed.
	  		// '@Input() data' is merely changing, so that is why 'this.cd.markForCheck()' is necessary
			this.foods.push(food); 
			this.cd.markForCheck();
		}
	  });
  }
}
