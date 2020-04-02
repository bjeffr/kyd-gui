import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: FormGroup) {
    user.addControl('account', new FormControl('kjh234kjhsfd34jhkjhsdf'));
    user.addControl('contract', new FormControl('lkj21345jhlkdjfh834roiqw'));

    return this.http.post(environment.kydService.concat('devices/register'), user.value);
  }

  isLoggedIn() {

  }

  isRegistered() {

  }
}
