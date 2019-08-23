import { Component, OnInit } from '@angular/core';
import { DemoNgContentComponent } from './demo-ng-content.component';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*
import {Component, ContentChild, Directive, Input, AfterContentInit} from '@angular/core';

@Directive({selector: 'pane'})
export class Pane {
  @Input() id: string;
}

@Component({
  selector: 'tab',
  template: `
    <div>pane: {{pane?.id}}</div>
  `
})
export class Tab {
  @ContentChild(Pane, {static: false}) pane !: Pane;
  ngAfterContentInit() {
	  console.log(this.pane);
  }
}

@Component({
  selector: 'example-app',
  template: `
    <tab>
      <pane id="1" *ngIf="shouldShow"></pane>
      <pane id="2" *ngIf="!shouldShow"></pane>
    </tab>

    <button (click)="toggle()">Toggle</button>
  `,
})
export class ConsumerComponent {
  shouldShow = true;

  toggle() { this.shouldShow = !this.shouldShow; }
}
*/
