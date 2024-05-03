import { Component, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-users',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    CommonModule,
  ],
  providers: [UserService],
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css',
})
export class AddEditUsersComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditUsersComponent>,
    private _userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addUserForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
          ),
        ],
      ],
      role: '',
      createdOn: new Date().toString(),
    });
  }

  ngOnInit(): void {
    this.addUserForm.patchValue(this.data);
  }

  roles = new FormControl('');
  rolesList: string[] = ['Administrator', 'Manager', 'Customer'];

  onSubmitForm() {
    if (this.addUserForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.data.id, this.addUserForm.value)
          .subscribe({
            next: (value: any) => {
              alert('User updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._userService.addUser(this.addUserForm.value).subscribe({
          next: (value: any) => {
            alert('User added!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
