import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PullDataService } from '../../../services/pull-data.service';
import { ChartModule } from 'primeng/chart';
import { OrdersComponent } from '../../../orders/orders.component';

@Component({
  selector: 'app-pie-payment-status-distribution',
  standalone: true,
  imports: [ChartModule, HttpClientModule, OrdersComponent],
  providers: [PullDataService],
  templateUrl: './pie-payment-status-distribution.component.html',
  styleUrl: './pie-payment-status-distribution.component.css',
})
export class PiePaymentStatusDistributionComponent implements OnInit {
  data: any;
  options: any;
  statusData: any[] = [];
  transactionDataArrChart: any[] = [];
  constructor(private _pullDataService: PullDataService) {}

  getStatusData() {
    this._pullDataService.getOrdersData().subscribe({
      next: (value) => {
        this.statusData = value;
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    console.log('init');
    this._pullDataService.getOrdersData().subscribe((data) => {
      this.statusData = data;

      const chartArray = new Array(3).fill(0);
      let createdOnDateStrin;
      let createdOnDate;
      let todayDate = new Date();
      todayDate.setHours(24, 0, 0, 0);

      let dayDif: number;
      let indexArray: number;
      let numOfSucTransactions: number = 0;
      let numOfFailedTransaction: number = 0;
      let numOfPendingTransaction: number = 0;
      for (let i = 0; i < this.statusData.length; i++) {
        if (this.statusData[i].status) {
          createdOnDateStrin = this.statusData[i].createdOn;
          createdOnDate = new Date(createdOnDateStrin);
          dayDif =
            (todayDate.getTime() - createdOnDate.getTime()) /
            1000 /
            60 /
            60 /
            24;
          if (dayDif >= 0 && dayDif < 30) {
            console.log(this.statusData[i].status);
            if (this.statusData[i].status === 'Successful') {
              numOfSucTransactions += 1;
              chartArray[0] += 1;
              console.log(numOfSucTransactions);
            } else if (this.statusData[i].status === 'Failed') {
              numOfFailedTransaction += 1;
              chartArray[1] += 1;
            } else if (this.statusData[i].status === 'Pending') {
              numOfPendingTransaction += 1;
              chartArray[2] += 1;
            }
            this.transactionDataArrChart = chartArray;
          }
        }
      }

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: ['Successful', 'Failed', 'Pending'],
        datasets: [
          {
            data: this.transactionDataArrChart,
            backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
            hoverBackgroundColor: ['#66BB6A', '#EF5350', '#42A5F5'],
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    });
  }
}
