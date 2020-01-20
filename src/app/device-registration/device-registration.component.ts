import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-device-registration',
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.scss']
})
export class DeviceRegistrationComponent implements OnInit {

  private device: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.device = this.fb.group({
      name: [null, Validators.required],
      make: [null, Validators.required],
      model: [null, Validators.required],
      registrant: [null, Validators.required],
      sramStream: [null, Validators.compose([
          Validators.required,
          Validators.minLength(32),
          Validators.maxLength(32)
      ])],
    });
  }

}
