import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class EvDataService {
  private dataUrl = 'assets/data/Electric_Vehicle_Population_Data.csv';

  constructor(private http: HttpClient) { }

  getEVData(): Observable<any[]> {
    return this.http.get(this.dataUrl, { responseType: 'text' }).pipe(
      map(csvData => {
        const parsedData = Papa.parse(csvData, { header: true });
        return parsedData.data;
      })
    );
  }
}
