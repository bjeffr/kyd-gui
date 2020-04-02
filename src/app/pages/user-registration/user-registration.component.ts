import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {faAddressCard, faEnvelope, faMapMarkerAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {Country} from '@angular-material-extensions/select-country';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private user: FormGroup;
  addressCardIcon = faAddressCard;
  addressIcon = faMapMarkerAlt;
  envelopeIcon = faEnvelope;
  mobileIcon = faMobileAlt;
  deploying = false;
  today = new Date();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.fb.group({
      firstName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      lastName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(150)
      ])],
      birthDate: [null, Validators.required],
      street: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(150)
      ])],
      postalCode: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(12)
      ])],
      city: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(150)
      ])],
      country: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.max(150)
      ])],
      mobileNumber: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])]
    });
  }

  setCountry(country: Country) {
    this.user.get('country').setValue(country.alpha3Code);
  }

  setMobileNumber(mobileNumber: string) {
    this.user.get('mobileNumber').setValue(mobileNumber);
  }

  mobileNumberError(event: any): void {
    if (!event && this.user.value.mobileNumber !== null) {
      this.user.get('mobileNumber').setErrors({invalidCellPhone: true});
    }
  }

  onSubmit() {
    console.log(this.user.value);
    this.userService.register(this.user).subscribe(value => {
      console.log(value);
    });
  }
}
