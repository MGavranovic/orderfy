import { Component } from '@angular/core';

// importing graphs
import { LineSuccessfulTransactionsComponent } from './line-successful-transactions/line-successful-transactions.component';
import { LineUsersComponent } from './line-users/line-users.component';
import { PiePaymentStatusDistributionComponent } from './pie-payment-status-distribution/pie-payment-status-distribution.component';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [
    LineSuccessfulTransactionsComponent,
    LineUsersComponent,
    PiePaymentStatusDistributionComponent,
  ],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css',
})
export class GraphsComponent {}
