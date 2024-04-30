import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ToolbarModule,
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [DialogService, MessageService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(private _dialog: MatDialog) {}

  openAddUserForm() {
    this._dialog.open(AddEditUsersComponent);
  }
}
