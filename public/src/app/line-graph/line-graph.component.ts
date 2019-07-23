import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

const NOW = new Date();
const DAYS_IN_MONTH = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0).getDate();
const MONTH_LABELS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {

	@ViewChild('canvas_container', {static: true}) canvasContainer: ElementRef;
	@ViewChild(BaseChartDirective, {static: true}) chartComponent: BaseChartDirective;
	private backendData: any;
	private getLegendCallback = ((self) => {
		function handle(chart) { return chart.legend.legendItems; }
		return function(chart) { return handle(chart); }
	})(this);
	public canvasHeight: string;
	public legendData: any;
	public lineChartData: ChartDataSets[] = [
		{ data: [], label: 'Studies', borderDash: [10,0], borderWidth: 1 },
		{ data: [], label: 'Reports', borderDash: [7, 3], borderWidth: 1 }
	];
	public lineChartLabels: Label[] = Array.from(
		{ length: DAYS_IN_MONTH },
		(x, i) => i + 1 + ''
	);
	public lineChartOptions: ChartOptions;
	public lineChartColors: Color[] = [
	    { borderColor: 'red', backgroundColor: 'rgba(255,255,255,0.0)', },
		{ borderColor: 'blue', backgroundColor: 'rgba(255,255,255,0.0)'}
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];
	public nStudies: number = 10;
	public nReports: number = 10;
	public prcntCatalogued: number = 100;
	public lastActivityTimestamp: string = '7/17/2019 15:32:10';

	constructor(private httpClient: HttpClient) {

	}

	public ngOnInit() {
    	this.setChartOptions(0, 0);
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json'
            })
        };
        this.httpClient.get<any>(`/dashboard?t=`+Date.now(), httpOptions).subscribe((backendData: any) => {
        	this.backendData = backendData;
        	let max = this.getMaxDataValue('daily');
        	let steps = this.getSteps(max);
        	this.setChartOptions(max - max % steps + steps, steps);
        	this.lineChartData[0].data = backendData.daily.studies;
        	this.lineChartData[1].data = backendData.daily.reports;
			this.legendData = this.chartComponent.chart.generateLegend();
			this.canvasHeight = this.canvasContainer.nativeElement.offsetHeight + 'px';
    	});
	}

	private daily() {
		this.lineChartLabels = Array.from(
			{ length: DAYS_IN_MONTH },
			(x, i) => i + 1 + ''
		);
    	this.lineChartData[0].data = this.backendData.daily.studies;
    	this.lineChartData[1].data = this.backendData.daily.reports;
    	let max = this.getMaxDataValue('daily');
    	let steps = this.getSteps(max);
    	this.setChartOptions(max - max % steps + steps, steps);
	}

	private monthly() {
		let labels = MONTH_LABELS.slice(0);
		for (let i = 0; i < NOW.getMonth(); i++) {
			labels.push(labels.shift());
		}
		labels.push(MONTH_LABELS[NOW.getMonth()]);
		this.lineChartLabels = labels;
    	this.lineChartData[0].data = this.backendData.monthly.studies;
    	this.lineChartData[1].data = this.backendData.monthly.reports;
    	let max = this.getMaxDataValue('monthly');
    	let steps = this.getSteps(max);
    	this.setChartOptions(max - max % steps + steps, steps);
	}

	private setChartOptions(max: number, stepSize: number) {
		this.lineChartOptions = {
  			responsive: true,
  			scales: {
  	            yAxes: [{
  	                ticks: {
  	                    beginAtZero: false,
  	                    max: max,
  	                    min: 0,
  	                    stepSize: stepSize
  	                }
  	            }]
  	        },
  			legendCallback: this.getLegendCallback
  		};
	}

	private getMaxDataValue(frequency: string): number {
		let data = this.backendData[frequency].studies.concat(this.backendData[frequency].reports).slice(0);
		return data.sort((a, b) => {
            if (a < b) { return  1; }
            if (a > b) { return  -1; }
            return 0;
		})[0];
	}

	private getSteps(max: number): number {
		if (max < 10) {
			return 1;
		} else if (max >= 10 && max < 20) {
			return 2;
		} else if (max >= 20 && max < 50) {
			return 5;
		} else if (max >= 50 && max < 100) {
			return 10;
		} else if (max >= 100 && max < 200) {
			return 20;
		} else if (max >= 200 && max < 500) {
			return 50;
		} else {
			return 100;
		}
	}

	private onResize(e) {
		setTimeout(() => {
			this.canvasHeight = this.canvasContainer.nativeElement.offsetHeight + 'px';
		}, 0);
	}
}
