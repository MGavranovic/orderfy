import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/users', data);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/users/${id}`, data);
  }

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  deleteUser(id: any): Observable<any> {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }
}
