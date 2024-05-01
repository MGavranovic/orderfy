import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
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
  ],
  providers: [UserService],
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css',
})
export class AddEditUsersComponent {
  addUserForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: DialogRef<AddEditUsersComponent>,
    private _userService: UserService
  ) {
    this.addUserForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      createdOn: new Date().toString(),
    });
  }

  roles = new FormControl('');
  rolesList: string[] = ['Administrator', 'Manager', 'Customer'];

  onSubmitForm() {
    if (this.addUserForm.valid) {
      this._userService.addUser(this.addUserForm.value).subscribe({
        next: (value: any) => {
          alert('User added!');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
