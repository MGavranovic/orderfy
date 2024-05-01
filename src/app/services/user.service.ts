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

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }
}
