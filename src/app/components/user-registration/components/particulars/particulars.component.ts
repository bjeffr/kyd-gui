import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faAddressCard, faEnvelope, faMapMarkerAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {Country} from '@angular-material-extensions/select-country';

@Component({
  selector: 'app-particulars',
  templateUrl: './particulars.component.html',
  styleUrls: ['./particulars.component.scss']
})
export class ParticularsComponent implements OnInit {

  @Input() user: FormGroup;
  @Output() continue: EventEmitter<null> = new EventEmitter();
  @Output() back: EventEmitter<null> = new EventEmitter();
  form: FormGroup;
  addressCardIcon = faAddressCard;
  addressIcon = faMapMarkerAlt;
  mobileIcon = faMobileAlt;
  today = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: this.user.get('firstName'),
      lastName: this.user.get('lastName'),
      birthDate: this.user.get('birthDate'),
      street: this.user.get('street'),
      houseNumber: this.user.get('houseNumber'),
      postalCode: this.user.get('postalCode'),
      city: this.user.get('city'),
      country: this.user.get('country'),
      mobileNumber: this.user.get('mobileNumber')
    });
  }

  setCountry(country: Country) {
    this.form.get('country').setValue(country.alpha3Code);
  }

  setMobileNumber(mobileNumber: string) {
    this.form.get('mobileNumber').setValue(mobileNumber);
  }

  mobileNumberError(event: any): void {
    if (!event && this.form.value.mobileNumber !== null) {
      this.form.get('mobileNumber').setErrors({invalidCellPhone: true});
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.user.patchValue({
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        birthDate: this.form.value.birthDate,
        street: this.form.value.street,
        houseNumber: this.form.value.houseNumber,
        postalCode: this.form.value.postalCode,
        city: this.form.value.city,
        country: this.form.value.country,
        mobileNumber: this.form.value.mobileNumber,
      });
      this.continue.emit();
    }
  }
}
