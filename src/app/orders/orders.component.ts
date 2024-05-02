import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {}
