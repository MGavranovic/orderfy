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
  numberOfSuccessfulTransactions: number;

  constructor(private _pullDataService: PullDataService) {
    this.getOrdersData();
  }

  getOrdersData() {
    this._pullDataService
      .getOrdersData()
      .subscribe((data) => (this.orderData = data));
    // console.log(this.orderData);
  }

  getLastThirtyDays(): { day: number; month: number }[] {
    const today: Date = new Date();
    console.log(today);

    for (let i = 29; i >= 0; i--) {
      // const dateForDataFiltering = new Date(today);
      // dateForDataFiltering.setDate(today.getDate() - i);
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth();
      this.dates.push({ day, month });
      console.log('dm ', day, month);
      // this.unformatedDateForDataFiltering.push(dateForDataFiltering);
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

  ngOnInit() {
    this.last30Days.forEach(
      ({ day, month }: { day: number; month: number }) => {
        const formattedDate = this.formatDayMonth(day, month);
        // console.log(formattedDate);
        this.formatedDateArr.push(formattedDate);
        // console.log(this.formatedDateArr);
      }
    );

    const chartArray = new Array(30).fill(0);
    // console.log(chartArray);
    let paidOnDateString;
    let paidOnDate;
    let todayDate = new Date();
    todayDate.setHours(24, 0, 0, 0);
    console.log(todayDate);

    let dayDif: number;
    let indexArray: number;
    let numOfSucTransactions: number = 0;

    for (let i = 0; i < this.orderData.length; i++) {
      if (this.orderData[i].paidOn) {
        paidOnDateString = this.orderData[i].paidOn;
        paidOnDate = new Date(paidOnDateString);
        // console.log(paidOnDate);
        dayDif =
          (todayDate.getTime() - paidOnDate.getTime()) / 1000 / 60 / 60 / 24;
        // console.log(dayDif);
        if (dayDif >= 0 && dayDif < 30) {
          // console.log(Math.floor(dayDif));
          indexArray = chartArray.length - Math.floor(dayDif) - 1;
          // console.log('poz', indexArray);
          chartArray[indexArray] += 1;
          numOfSucTransactions += 1;
        }
      }
    }
    this.numberOfSuccessfulTransactions = numOfSucTransactions;

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
          data: chartArray,
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
