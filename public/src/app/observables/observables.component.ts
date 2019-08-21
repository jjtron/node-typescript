import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Scheduler } from 'rxjs';
import { of, interval, timer } from 'rxjs';
import { 
		 map, filter, catchError, tap, mapTo, share, concatAll, merge,
		 pluck, shareReplay, take, delay, concatMap, mergeAll,
	   } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
selector: 'app-observables',
templateUrl: './observables.component.html',
styleUrls: ['./observables.component.css']
})
export class ObservablesComponent implements OnInit {

	isOn: boolean = true;
	demoZero: any = {
			subscribeMethod_B: '',
			onErrorB: 'B: Might end on error()',
			onCompleteB: 'B: Might end on complete()'
	};
	demoOne: any = {next: 'Waiting ...', error: '', complete: 'no errors'};

	constructor() {
		
		// DEMO 2 HIGH ORDER OBSERVABLES ///////////////////////
		const highOrderObs = of(
			ajax({url: 'delay-response?delaytime=3000', responseType: 'text'}),
			ajax({url: 'delay-response?delaytime=2000', responseType: 'text'}),
			ajax({url: 'delay-response?delaytime=1000', responseType: 'text'}),
			of({response: 1}, {response: 2}, {response: 3})
		);
		highOrderObs.pipe(concatAll()).subscribe(ret => console.log(ret.response));
		// END DEMO 2 //////////////////////////////////////////
		

		// DEMO DIRT SIMPLE EXAMPLE //////////////////////////////////////////
		new Observable(
				(obsrvr) => {obsrvr.next(1)}
			)
			.subscribe(
				{ next: (x) => console.log(x) }
			);
		// END DIRT SIMPLE EXAMPLE //////////////////////////////////////////

		
	    // DEMO 0 //////////////////////////////////////////
		//
		// An observable can be created by using the new keyword (as in constructor).
		// The argument to ne constructor is a FUNCTION.
		// The argument to that FUNCTION is an OBSERVER (observer).
		// That OBSERVER optionally defines .next, .complete, and .error.
		// 
		// The FUNTION has to return an unsubscribe() definition.
		//
		function sequenceSubscriber(observer) {
			let i = 1;
			observer.next(i);
			const intrvl = setInterval(() => {
				i++;
				observer.next(i);
				if (i === 3) {
					clearInterval(intrvl);
					if (Math.floor(Math.random() * Math.floor(2))) {
						observer.error('Ended on error()');
					} else {
						observer.complete();
					}
				}
			}, 1000);
			// unsubscribe function doesn't need to do anything in this
			// because values are delivered synchronously
			return { unsubscribe() { } };
		}
		// Create a new Observable that will deliver the above sequence
		const sequence = new Observable(sequenceSubscriber);
		// execute the Observable and print the result of each notification
		sequence.subscribe({
			next(num) {
				setTimeout(() => {
					document.getElementById('demo-method-a').innerHTML = 'subscribe Method_A: ' + num;
				}, 0);
			},
			error(e) {
				document.getElementById('demo-method-a-error').innerHTML = 'A ' + e;
				document.getElementById('demo-method-a-complete').innerHTML = '';
			},
			complete() {
				document.getElementById('demo-method-a-error').innerHTML = 'A Ended on complete()';
				document.getElementById('demo-method-a-complete').innerHTML = '';
			}
		});
		sequence.subscribe(
			(num) => {
				this.demoZero.subscribeMethod_B = 'subscribe Method_B: ' + num;
			},
			(error) => {
				this.demoZero.onErrorB = 'B ' + error;
				this.demoZero.onCompleteB = '';
			},
			() => {
				this.demoZero.onCompleteB = 'B Ended on complete()';
				this.demoZero.onErrorB = '';
			}
		);
		// END DEMO 0 //////////////////////////////////////////
		
		// DEMO 1 //////////////////////////////////////////
		const myObservable = of(0, 1, 2, 3, 4, 5);
		// Create observer object
		const myObserver = {
			next: x => this.demoOne.next = 'Observer got a next value: ' + x,
			error: err => this.demoOne.error = 'Observer got an error: ' + err,
			complete: () => this.demoOne.complete = 'Observer got a complete notification',
		};
		// Execute with the observer object
		myObservable.pipe(
			concatMap(val => of(`after delay of ${val} seconds`).pipe(delay((val === 0) ? 0 : 1000)))
		).subscribe(myObserver);
		// END DEMO 1 //////////////////////////////////////////


  	}

	ngOnInit() { }
}
