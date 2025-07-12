import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChartdataService {
  private dataUrl = '../../assets/chartdata.json';

  constructor(private http: HttpClient) { }

getChartData(chartKey: string): Observable<{ data: ChartConfiguration['data']; type: ChartType; options: ChartConfiguration['options'] }> {
  return this.http.get<{ [key: string]: { chartType: ChartType; labels: string[], datasets: any, options: any } }>(this.dataUrl).pipe(
    map(response => ({
      data: response[chartKey],  
      type: response[chartKey].chartType, 
      options: response[chartKey].options || { responsive: true }
    }))
  );
}

 
  
}
