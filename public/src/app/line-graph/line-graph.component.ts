import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

const NOW = new Date();
const DAYS_IN_MONTH = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0).getDate();
const MONTH_LABELS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json'
    })
};

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent  implements OnInit, AfterViewInit {

	@ViewChild('canvas_container', {static: true}) canvasContainer: ElementRef;
	@ViewChild(BaseChartDirective, {static: true}) chartComponent: BaseChartDirective;
	private backendResponse: any;
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
	    { borderColor: '#f00', backgroundColor: 'rgba(255, 255, 255, 0.0)', },
		{ borderColor: '#00f', backgroundColor: 'rgba(255, 255, 255, 0.0)'}
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];
	public nStudies: number = 10;
	public nReports: number = 10;
	public prcntCatalogued: number = 100;
	public lastActivityTimestamp: string = '7/17/2019 15:32:10';
	public error: string;

	constructor(private httpClient: HttpClient) {

	}

	public ngOnInit() {
        document.getElementById('daily-button').focus();
    	this.setChartOptions(0, 0, 'daily');
        this.daily();
	}

	public ngAfterViewInit() {
		this.onResize();
	}

	public daily() {
		this.getData('daily').subscribe((backendResponse: any) => {
			if (backendResponse.success) {
				this.lineChartLabels = Array.from(
					{ length: DAYS_IN_MONTH },
					(x, i) => i + 1 + ''
				);
				this.setLineChartData(backendResponse, 'daily');
			}
		},
		(e) => { this.onError(e); });
	}

	public monthly() {
		this.getData('monthly').subscribe((backendResponse: any) => {
			if (backendResponse.success) {
				let labels = MONTH_LABELS.slice(0);
				for (let i = 0; i < NOW.getMonth(); i++) {
					labels.push(labels.shift());
				}
				labels.push(MONTH_LABELS[NOW.getMonth()]);
				this.lineChartLabels = labels;
				this.setLineChartData(backendResponse, 'monthly');
			}
		},
		(e) => { this.onError(e); });
	}

	public onResize() {
		setTimeout(() => {
			this.canvasHeight = this.canvasContainer.nativeElement.offsetHeight + 'px';
		}, 0);
	}

	private getData(frequency: string) {
		this.error = '';
		return this.httpClient.get<any>(`/dashboard/${frequency}?t=${Date.now()}`, httpOptions);
	}

	private setLineChartData(backendResponse: any, frequency: string) {
    	this.backendResponse = backendResponse;
    	this.lineChartData[0].data = this.backendResponse.data[frequency].studies;
    	this.lineChartData[1].data = this.backendResponse.data[frequency].reports;
    	let max = this.getMaxDataValue(frequency);
    	let steps = this.getSteps(max);
    	this.setChartOptions(max - max % steps + steps, steps, frequency);
        if (!this.legendData) {
        	this.legendData = this.chartComponent.chart.generateLegend();
        }
	}

	private setChartOptions(max: number, stepSize: number, frequency) {
		let titlePrefix = (frequency === 'daily') ? MONTH_LABELS[NOW.getMonth()] : '';
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
  	        tooltips: {
  	            // Disable the on-canvas tooltip
  	            enabled: false,
  	            custom: function(tooltipModel) {
  	                // Tooltip Element
  	                let tooltipEl = document.getElementById('chartjs-tooltip');
  	                // Create element on first render
  	                if (!tooltipEl) {
  	                    tooltipEl = document.createElement('div');
  	                    tooltipEl.id = 'chartjs-tooltip';
  	                    tooltipEl.innerHTML = '<table></table>';
  	                    document.body.appendChild(tooltipEl);
  	                }
  	                // Hide if no tooltip
  	                if (tooltipModel.opacity === 0) {
  	                    tooltipEl.style.opacity = '0';
  	                    return;
  	                }
  	                // Set caret Position
  	                tooltipEl.classList.remove('above', 'below', 'no-transform');
  	                if (tooltipModel.yAlign) {
  	                    tooltipEl.classList.add(tooltipModel.yAlign);
  	                } else {
  	                    tooltipEl.classList.add('no-transform');
  	                }
  	                function getBody(bodyItem) {
  	                    return bodyItem.lines;
  	                }
  	                // Set Text
  	                if (tooltipModel.body) {
  	                    let titleLines = tooltipModel.title || [];
  	                    let bodyLines = tooltipModel.body.map(getBody);
  	                    let innerHtml = '<thead>';
  	                    titleLines.forEach(function(title) {
  	                        innerHtml += '<tr><th>' +  titlePrefix + ' ' + title + '</th></tr>';
  	                    });
  	                    innerHtml += '</thead><tbody>';
  	                    bodyLines.forEach(function(body, i) {
  	                        let colors = tooltipModel.labelColors[i];
  	                        let style = 'background:' + colors.backgroundColor;
  	                        style += '; border-color:' + colors.borderColor;
  	                        style += '; border-width: 2px';
  	                        let span = '<span style="' + style + '"></span>';
  	                        innerHtml += '<tr><td>' + span + body + '</td></tr>';
  	                    });
  	                    innerHtml += '</tbody>';
  	                    const tableRoot = tooltipEl.querySelector('table');
  	                    tableRoot.innerHTML = innerHtml;
  	                }
  	                // `this` will be the overall tooltip
  	                const position = this._chart.canvas.getBoundingClientRect();
  	                // Display, position, and set styles for font
  	                tooltipEl.style.opacity = '1';
  	                tooltipEl.style['background-color'] = 'rgb(140, 197, 64, 0.75)';
  	                tooltipEl.style['border-radius'] = '5px';
  	                tooltipEl.style.border = 'solid 1px black';
  	                tooltipEl.style.position = 'absolute';
  	                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
  	                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
  	                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  	                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
  	                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  	                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
  	                tooltipEl.style.pointerEvents = 'none';
  	            }
  	        },
  			legendCallback: this.getLegendCallback
  		};
	}

	private getMaxDataValue(frequency: string): number {
		let data = this.backendResponse.data[frequency].studies.concat(this.backendResponse.data[frequency].reports).slice(0);
		return data.sort((a, b) => {
            if (a < b) { return  1; }
            if (a > b) { return -1; }
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

	private onError(e: any) {
		this.error = e.error.errorMsg;
		this.setChartOptions(10, 1, '');
		this.lineChartLabels = [];
    	this.lineChartData[0].data = [];
    	this.lineChartData[1].data = [];
	}
}
