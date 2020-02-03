import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SimpleJwt} from '../models/simple-jwt.model';
import {concatMap, tap} from 'rxjs/operators';
import {Device} from '../models/device.model';
import {UserService} from './user.service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService,
              private userService: UserService) {
  }

  register(device: FormGroup) {
    if (this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'))) {
      return this.userService.refresh().pipe(
        concatMap(() => this.http.post('https://puf.dev.eng.c-alm.ch/register/device', device.value))
      );
    }
    return this.http.post('https://puf.dev.eng.c-alm.ch/register/device', device.value);
  }

  getAll() {
    if (this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'))) {
      return this.userService.refresh().pipe(
        concatMap(() => this.http.get<Array<Device>>('https://puf.dev.eng.c-alm.ch/devices'))
      );
    }
    return this.http.get<Array<Device>>('https://puf.dev.eng.c-alm.ch/devices');
  }
}
