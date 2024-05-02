import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PullDataService {
  constructor(private _http: HttpClient) {}

  getUserData(): Observable<any> {
    return this._http.get('http://localhost:3000/users');
  }

  getOrdersData(): Observable<any> {
    return this._http.get(`http://localhost:3000/orders`);
  }
}
