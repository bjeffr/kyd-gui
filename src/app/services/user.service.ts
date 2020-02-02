import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(user: FormGroup) {
    console.log(user.value);
    // return this.http.post('http://localhost:8000/register/user', user.value);
    return this.http.post('http://puf.dev.eng.c-alm.ch/register/user', user.value);
  }

  login(user: FormGroup) {
    // return this.http.post('http://localhost:8000/api/token/', user.value)
    return this.http.post('http://puf.dev.eng.c-alm.ch/api/token/', user.value)
      .pipe(tap(res => this.setSession), shareReplay());
  }

  private setSession(authResult) {
    console.log(authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('access_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    console.log(localStorage);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
