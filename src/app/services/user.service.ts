import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {first, single, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {SimpleJwt} from '../models/simple-jwt.model';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) { }

  create(user: FormGroup) {
    console.log(user.value);
    return this.http.post<SimpleJwt>('https://puf.dev.eng.c-alm.ch/register/user', user.value).pipe(
      tap(data => {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
      })
    );
  }

  login(user: FormGroup) {
    return this.http.post<SimpleJwt>('https://puf.dev.eng.c-alm.ch/api/token/', user.value).pipe(
      tap(data => {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
      })
    );
  }

  refresh() {
    const refresh = {
      refresh: localStorage.getItem('refresh_token')
    };
    return this.http.post<SimpleJwt>('https://puf.dev.eng.c-alm.ch/api/token/refresh/', refresh).pipe(
      tap(data => {
        localStorage.setItem('access_token', data.access);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLoggedIn() {
    return !this.jwtHelperService.isTokenExpired(localStorage.getItem('refresh_token'));
  }
}
