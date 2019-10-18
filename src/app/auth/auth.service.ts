import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { JwtResponse } from '../model/jwt-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //AUTH_SERVER: string = "https://app-my-cars.herokuapp.com";
  AUTH_SERVER: string = "http://localhost:8085";
  authSubject = new BehaviorSubject(false);
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.AUTH_SERVER}/api/v1/user/register`, user).pipe(
      tap((res: JwtResponse) => {
        if (res.access_token) {
          localStorage.set("ACCESS_TOKEN", res.access_token);
          localStorage.set("EXPIRES_IN", res.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  singIn(user: User): Observable<JwtResponse> {

    const data = new HttpParams()
      .set('username', user.login)
      .set('password', user.password)
      .set('grant_type', 'password');

    return this.http.post(`${this.AUTH_SERVER}/oauth/token`, data,
      { headers: this.getHeader() }).pipe(
        tap(async (res: JwtResponse) => {
          if (res.access_token) {
            localStorage.clear();

            localStorage.setItem("ACCESS_TOKEN", res.access_token);
            localStorage.setItem("EXPIRES_IN", res.expires_in);

            this.showMenuEmitter.emit(true);
            this.authSubject.next(true);
          } else {
            this.showMenuEmitter.emit(false);
          }
        })
      );
  }

  private validateToken(token: string): Observable<boolean> {
    const options = {
      'headers': new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<boolean>(`${this.AUTH_SERVER}/api/validateToken`, options);
  }

  signOut() {
    localStorage.clear();
    this.showMenuEmitter.emit(false);
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return new Promise(async (resolve, reject) => {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        await this.validateToken(localStorage.getItem("ACCESS_TOKEN")).subscribe((res: boolean) => {
          res ? resolve(true) : reject(false);
        });
      }else{
        reject(false);
      }
    });
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dG9td2VsbEFwcDowNm9HZyNLRmFCcjE0VE43QGVaTEJ5U3N0JEt1VUR4bQ=='
    });
  }

  getAuthoriHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dG9td2VsbEFwcDowNm9HZyNLRmFCcjE0VE43QGVaTEJ5U3N0JEt1VUR4bQ=='
    });
  }

}
