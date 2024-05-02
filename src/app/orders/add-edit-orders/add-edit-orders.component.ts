import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { Inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { validateHeaderName } from 'http';
import { CommonModule } from '@angular/common';

enum PaymentStatus {
  Pending = 'Pending',
  Successful = 'Successful',
  Failed = 'Failed',
}

@Component({
  selector: 'app-add-edit-orders',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MultiSelectModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [OrderService, CommonModule],
  templateUrl: './add-edit-orders.component.html',
  styleUrl: './add-edit-orders.component.css',
})
export class AddEditOrdersComponent implements OnInit {
  addOrderForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditOrdersComponent>,
    private _orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addOrderForm = this._fb.group({
      title: '',
      description: '',
      status: this.generatePaymentStatus(),
      amount: '',
      currency: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      country: '',
      createdOn: new Date().toString(),
      paidOn: this.timeOfPayment,
      authorizationCode: '',
    });
  }

  ngOnInit(): void {
    this.addOrderForm.patchValue(this.data);
  }

  paymentStatusCheck: boolean = false;

  timeOfPayment: string = '';

  generatePaymentStatus(): PaymentStatus {
    let outcome = Math.random();
    if (outcome < 0.6) {
      this.paymentStatusCheck = true;
      this.timeOfPayment = new Date().toString();
      return PaymentStatus.Successful;
    } else if (outcome < 0.8) {
      return PaymentStatus.Failed;
    } else {
      return PaymentStatus.Pending;
    }
  }

  generateAuthorizationCode(length: number): string | null {
    if (this.paymentStatusCheck) {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      console.log(code);
      return code;
    } else {
      return null;
    }
  }

  onSubmitForm() {
    if (this.addOrderForm.valid) {
      if (this.data) {
        this._orderService
          .updateOrder(this.data.id, this.addOrderForm.value)
          .subscribe({
            next: (value: any) => {
              alert('Order Updated!');
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._orderService.addOrder(this.addOrderForm.value).subscribe({
          next: (value: any) => {
            this.generateAuthorizationCode(4);
            this._dialogRef.close(true);
            console.log(value);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
