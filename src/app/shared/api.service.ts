import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { Car } from '../model/car';
import { toBase64String } from '@angular/compiler/src/output/source_map';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const httpOptionsAuthenticated = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  })
};
const httpPostParamOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
};
// const apiUrl = 'https://app-my-cars.herokuapp.com/api';
const apiUrl = 'http://localhost:8085/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers (): Observable<any> {
    return this.http.get<any>(`${apiUrl}/users/`)
      .pipe(catchError(this.handleError('getUsers', [])));
  }

  getUser(id: number): Observable<any> {
    const url = `${apiUrl}/users/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  saveUser (user: User): Observable<any> {
    return this.http.post<User>(`${apiUrl}/users/`, user, httpOptions)
      .pipe(
        catchError(this.handleError('save an user', []))
      );
  }

  updateUser (user: User, id: number): Observable<any> {
    return this.http.put<User>(`${apiUrl}/users/${id}`, user, httpOptions)
      .pipe(
        catchError(this.handleError('update an user', []))
      );
  }

  deleteUser (id: number): Observable<any> {
    const url = `${apiUrl}/users/${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser')));
  }

  /*********************************   CAR  *************************************/

  getCars (): Observable<any> {
    return this.http.get<any>(`${apiUrl}/cars/`, httpOptionsAuthenticated)
      .pipe(catchError(this.handleError('getCars', [])));
  }

  getCar(id: number): Observable<any> {
    const url = `${apiUrl}/cars/${id}`;
    return this.http.get<any>(url, httpOptionsAuthenticated).pipe(catchError(this.handleError<User>(`getCar id=${id}`)));
  }

  saveCar (car: Car): Observable<any> {
    return this.http.post<User>(`${apiUrl}/cars/`, car, httpOptionsAuthenticated)
      .pipe(
        catchError(this.handleError('save a car', []))
      );
  }

  updateCar (car: Car, id: number): Observable<any> {
    return this.http.put<User>(`${apiUrl}/users/${id}`, car, httpOptionsAuthenticated)
      .pipe(
        catchError(this.handleError('update an user', []))
      );
  }

  deleteCar (id: number): Observable<any> {
    const url = `${apiUrl}/cars/${id}`;
    return this.http.delete<any>(url, httpOptionsAuthenticated).pipe(
      catchError(this.handleError<User>('deleteCar')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (res: any): Observable<T> => {
      return throwError(res);
    };
  }
}
