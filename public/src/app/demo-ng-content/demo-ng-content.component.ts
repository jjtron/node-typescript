import { Component, AfterContentInit, ContentChild } from '@angular/core';
import { ConsumerComponent } from './consumer.component';

@Component({
  selector: 'app-demo-ng-content',
  templateUrl: './demo-ng-content.component.html',
  styleUrls: ['./demo-ng-content.component.css']
})
export class DemoNgContentComponent implements AfterContentInit {

  @ContentChild(ConsumerComponent, { static: false }) consumerComponent: ConsumerComponent;
  constructor() { }

  ngAfterContentInit() {
	  console.log(this.consumerComponent);
  }

}
