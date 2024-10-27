import { Component, OnInit } from '@angular/core';
import { EvDataService } from '../ev-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  evData: any[] = [];
  chartData: any[] = [];
  
  constructor(private evDataService: EvDataService) { }

  ngOnInit(): void {
    this.loadcsvData();
  }
  
  loadcsvData(){
    this.evDataService.getEVData().subscribe(data => {
      this.evData = data;
      
      this.prepareChartData();
    });
  }

  prepareChartData(): void {
    // Sample chart data preparation: count EVs by 'Make'
    const makeCount = this.evData.reduce((acc, ev) => {
      acc[ev.Make] = (acc[ev.Make] || 0) + 1;
      return acc;
    }, {});
    this.chartData = Object.keys(makeCount).map(make => ({
      name: make,
      value: makeCount[make]
    }));
  }

  
}
