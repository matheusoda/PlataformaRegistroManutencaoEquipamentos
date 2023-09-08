import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from './order.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { TypeItem } from './type.model';
import { statusItem } from './status.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrlOrder = 'http://localhost:3001/orders';
  baseUrlType = 'http://localhost:3001/types';
  baseUrlStatus = 'http://localhost:3001/status';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrlOrder, order);
  }

  read(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrlOrder).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Order> {
    const url = `${this.baseUrlOrder}/${id}`;
    return this.http.get<Order>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readTypes(): Observable<TypeItem[]> {
    return this.http.get<TypeItem[]>(this.baseUrlType).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readStatus(): Observable<statusItem[]> {
    return this.http.get<statusItem[]>(this.baseUrlStatus).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  update(order: Order): Observable<Order> {
    const url = `${this.baseUrlOrder}/${order.id}`;
    return this.http.put<Order>(url, order).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }
}
