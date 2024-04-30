import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-users',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
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
}
