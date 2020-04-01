import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(form: FormGroup) {

  }

  isLoggedIn() {

  }

  isRegistered() {

  }
}
