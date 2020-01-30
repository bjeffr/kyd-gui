import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {faAddressCard, faEnvelope, faMapMarkerAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {Country} from '@angular-material-extensions/select-country';

@Component({
  selector: 'app-particulars',
  templateUrl: './particulars.component.html',
  styleUrls: ['./particulars.component.scss']
})
export class ParticularsComponent implements OnInit {

  @Input() user: FormGroup;
  addressCardIcon = faAddressCard;
  addressIcon = faMapMarkerAlt;
  envelopeIcon = faEnvelope;
  mobileIcon = faMobileAlt;
  today = new Date();

  constructor() { }

  ngOnInit() { }

  setCountry(country: Country) {
    this.user.get('country').setValue(country.name);
  }
}
