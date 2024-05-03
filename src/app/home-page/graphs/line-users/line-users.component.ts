import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PullDataService } from '../../../services/pull-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from '../../../users/users.component';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-line-users',
  standalone: true,
  imports: [ChartModule, HttpClientModule, UsersComponent],
  providers: [PullDataService],
  templateUrl: './line-users.component.html',
  styleUrl: './line-users.component.css',
})
export class LineUsersComponent implements OnInit {
  data: any;
  options: any;
  dates: { day: number; month: number }[] = [];
  formatedDateArr: any[] = [];
  userData: any[];
  chartDataArray: any[] = [];
  numberOfUsers: number;

  constructor(private _pullDataService: PullDataService) {
    this.getUsersData();
  }

  getUsersData() {
    this._pullDataService.getUserData().subscribe({
      next: (value) => {
        console.log('getUsersData running');
        this.userData = value;
        console.log(this.userData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLastThirtyDays(): { day: number; month: number }[] {
    const today: Date = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = date.getDate();
      const month = date.getMonth();
      this.dates.push({ day, month });
      // console.log('dm ', day, month);
    }
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
    this._pullDataService.getUserData().subscribe((data) => {
      this.userData = data;
      this.last30Days.forEach(
        ({ day, month }: { day: number; month: number }) => {
          const formattedDate = this.formatDayMonth(day, month);
          this.formatedDateArr.push(formattedDate);
        }
      );

      const chartArray = new Array(30).fill(0);

      let createdOnDateString;
      let createdOnDate;
      let todayDate = new Date();
      todayDate.setHours(24, 0, 0, 0);
      console.log(todayDate);

      let dayDif: number;
      let indexArray: number;
      let numOfUsers: number = 0;

      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].createdOn) {
          createdOnDateString = this.userData[i].createdOn;
          createdOnDate = new Date(createdOnDateString);
          dayDif =
            (todayDate.getTime() - createdOnDate.getTime()) /
            1000 /
            60 /
            60 /
            24;

          if (dayDif >= 0 && dayDif < 30) {
            indexArray = chartArray.length - Math.floor(dayDif) - 1;
            chartArray[indexArray] += 1;
            numOfUsers += 1;
          }
        }
        this.chartDataArray = chartArray;
      }
      this.numberOfUsers = numOfUsers;

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
            label: 'Number of Users',
            data: this.chartDataArray,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--pink-500'),
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
    });
  }
}
