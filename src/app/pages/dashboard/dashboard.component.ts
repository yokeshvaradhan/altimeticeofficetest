import { Component, inject, OnInit,ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { InvestmentPopupComponent } from '../../pages/investment/investment';
import { Router } from '@angular/router';
import { ChartdataService } from '../../services/chartdata.service';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule,
            MatIconModule,
            MatDialogModule,
            MatToolbarModule,
            BaseChartDirective,
            CommonModule
          ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private chartDataService = inject(ChartdataService);
  assetAllocationData: any;
  marketTrendsData: any;
  performanceMetricsData: any;
  assetAllocationOptions: any;
  assetAllocationType: any;
  marketTrendsOptions: any;
  marketTrendsType: any;
  performanceMetricsOptions: any;
  performanceMetricsType: any;

  constructor(private router: Router, 
    private chartService: ChartdataService,
    private dialog: MatDialog,
   private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
   this.chartService.getChartData('assetAllocationChart').subscribe(data => {
    this.assetAllocationData = data.data;
    this.assetAllocationOptions = data.options;
    this.assetAllocationType = data.type;
    console.log('Asset Allocation Chart:', data);
  });

  this.chartService.getChartData('marketTrendsChart').subscribe(data => {
    this.marketTrendsData = data.data;
    this.marketTrendsOptions = data.options;
    this.marketTrendsType = data.type;
    console.log('Market Trends Chart:', data);
  });

  this.chartService.getChartData('performanceMetricsChart').subscribe(data => {
    this.performanceMetricsData = data.data;
    this.performanceMetricsOptions = data.options;
    this.performanceMetricsType = data.type;
    console.log('Performance Metrics Chart:', data);
  });


  }
   openInvestmentForm() {
    const dialogRef = this.dialog.open(InvestmentPopupComponent, {
      width: 'auto',  
      height: 'auto', 
      disableClose: false,  
      autoFocus: false  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Investment Form Data:', result);
      }
    });
  }

}
