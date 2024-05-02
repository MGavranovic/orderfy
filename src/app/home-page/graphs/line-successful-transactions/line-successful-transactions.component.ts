import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { response } from 'express';
import { ChartModule } from 'primeng/chart';
import { PullDataService } from '../../../services/pull-data.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OrdersComponent } from '../../../orders/orders.component';

@Component({
  selector: 'app-line-successful-transactions',
  standalone: true,
  imports: [ChartModule, HttpClientModule, OrdersComponent],
  providers: [PullDataService],
  templateUrl: './line-successful-transactions.component.html',
  styleUrl: './line-successful-transactions.component.css',
})
export class LineSuccessfulTransactionsComponent implements OnInit {
  data: any;
  options: any;
  dates: { day: number; month: number }[] = [];
  unformatedDateForDataFiltering: Date[] = [];
  formatedDate: any;
  formatedDateArr: any[] = [];
  orderData: any[];
  transformedData: any[];
  chartDataArray: any[] = [];

  constructor(private _pullDataService: PullDataService) {
    this.getOrdersData();
  }

  getOrdersData() {
    this._pullDataService
      .getOrdersData()
      .subscribe((data) => (this.orderData = data));
    console.log(this.orderData);
  }

  // getSuccessfulTransactionsPerDay(order: any): void {
  //   const successfulTransactionsPerDay = 0;
  //   let count = 0;
  //   order.forEach((order: any) => {
  //     if (order.paidOn) {
  //       count += 1;
  //     }
  //   });
  //   console.log(successfulTransactionsPerDay);
  // }

  getLastThirtyDays(): { day: number; month: number }[] {
    const today: Date = new Date();

    for (let i = 30; i > 0; i--) {
      const dateForDataFiltering = new Date(today);
      dateForDataFiltering.setDate(today.getDate() - i);
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      this.dates.push({ day, month });
      this.unformatedDateForDataFiltering.push(dateForDataFiltering);
    }
    // console.log(this.dates);
    // console.log(this.unformatedDateForDataFiltering);
    return this.dates;
  }

  formatDayMonth(day: number, month: number): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[month]} ${day}`;
  }
  last30Days: any[] = this.getLastThirtyDays() || [];

  // transformData(data: any[]): any[] {
  //   this.transformedData = [];
  //   this.unformatedDateForDataFiltering.forEach((date) => {
  //     const foundData = data.find(
  //       (item) => item.date === date && item.status === 'Successful'
  //     ); // Assuming 'date' is the key in your data object
  //     this.transformedData.push(foundData ? foundData.status : 0);
  //   });
  //   console.log(this.transformedData);
  //   console.log();
  //   return this.transformedData;
  // }

  ngOnInit() {
    this.last30Days.forEach(
      ({ day, month }: { day: number; month: number }) => {
        const formattedDate = this.formatDayMonth(day, month);
        // console.log(formattedDate);
        this.formatedDateArr.push(formattedDate);
        // console.log(this.formatedDateArr);
      }
    );

    // this.getSuccessfulTransactionsPerDay(this.orderData);
    // this.transformData(this.orderData);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.formatedDateArr,
      datasets: [
        {
          label: 'Successful Transactions',
          data: this.transformedData,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0,
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
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
