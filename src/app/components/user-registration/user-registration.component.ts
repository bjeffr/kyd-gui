import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private user: FormGroup;
  stage = 0;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private jwtHelperService: JwtHelperService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      birthDate: [null, Validators.required],
      street: [null, Validators.required],
      postalCode: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      mobileNumber: [null, Validators.required],
      idNumber: [null, Validators.required],
      idType: [null, Validators.required],
      idScan: [null, Validators.required],
    });

    this.user.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  submitUser() {
    this.userService.create(this.user).subscribe(() => {
      if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'))) {
        this.router.navigate(['/home']);
      }
    });
  }
}
