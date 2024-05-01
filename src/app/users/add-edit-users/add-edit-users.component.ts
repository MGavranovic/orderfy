import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

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
  ],
  templateUrl: './add-edit-users.component.html',
  styleUrl: './add-edit-users.component.css',
})
export class AddEditUsersComponent {
  addUserForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.addUserForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    });
  }
  logUser(): void {
    console.log(this.addUserForm.value);
  }

  roles = new FormControl('');
  rolesList: string[] = ['Administrator', 'Manager', 'Customer'];
}
