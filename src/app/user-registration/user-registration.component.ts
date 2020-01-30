import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {matchingPasswordValidator} from '../validators/matching-password.validator';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private user: FormGroup;
  stage = 1;
  addUserIcon = faUserPlus;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      street: [null, Validators.required],
      houseNumber: [null, Validators.required],
      postalCode: [null, Validators.required],
      city: [null, Validators.required],
      birthDate: [null, Validators.required],
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
}
