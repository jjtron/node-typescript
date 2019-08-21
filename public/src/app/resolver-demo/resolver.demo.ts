import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'demo-resolver',
	template: 'see console messages for output'
})
export class ResolverDemo implements OnInit {
	
  data: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.data = this.route.snapshot.data;
    console.log(this.data);
  }
}