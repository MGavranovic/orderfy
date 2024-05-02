import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient) {}

  addOrder(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/orders', data);
  }

  updateOrder(id: any, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/orders/${id}`, data);
  }

  getOrdersList(): Observable<any> {
    return this._http.get(`http://localhost:3000/orders`);
  }

  deleteOrder(id: any): Observable<any> {
    return this._http.get(`http://localhost:3000/orders/${id}`);
  }
}
