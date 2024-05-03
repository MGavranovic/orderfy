import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditOrdersComponent } from './add-edit-orders/add-edit-orders.component';
import { Injectable } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import e from 'express';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    DynamicDialogModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    AddEditOrdersComponent,

    /*
    ToolbarModule,
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    */
  ],
  providers: [
    DialogService,
    ViewChild,
    OrderService,
    MatSort,
    MatPaginator,
    MatDialog,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'amount',
    'currency',
    // 'firstName',
    'lastName',
    'email',
    'address',
    'city',
    'country',
    'createdOn',
    'paidOn',
    'authorizationCode',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(this.displayedColumns);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private _dialog: MatDialog,
    private _orderService: OrderService,
    _liveAnnouncer: LiveAnnouncer
  ) {
    this.getOrdersList();
  }

  ngOnInit(): void {
    this.getOrdersList();
  }

  openOrderform(): void {
    const dialogRef = this._dialog.open(AddEditOrdersComponent);
    dialogRef.afterClosed().subscribe({
      next: (value: any) => {
        if (value) this.getOrdersList();
      },
    });
  }

  getOrdersList() {
    this._orderService.getOrdersList().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(e: Event) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOrder(id: any) {
    this._orderService.deleteOrder(id).subscribe({
      next: (valid) => {
        alert('Order removed!');
        this.getOrdersList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openOrderForm(data: any) {
    const dialogRef = this._dialog.open(AddEditOrdersComponent, { data: data });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getOrdersList();
      },
    });
  }
}
