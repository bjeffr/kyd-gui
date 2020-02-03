import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';

@Component({
  selector: 'app-device-registration',
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.scss']
})
export class DeviceRegistrationComponent implements OnInit {

  private device: FormGroup;
  private arduinoModels = ['Uno WiFi', 'MKR1000', 'MKR Zero', '101', 'Zero', 'Due', 'Yún', 'Leonardo', 'Uno', 'Mega2560', 'Ethernet', 'Fio',
    'Nano', 'LilyPad', 'Pro', 'Mega ADK', 'Esplora', 'Micro', 'Pro Mini'];

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService) { }

  ngOnInit() {
    this.device = this.fb.group({
      name: [null, Validators.required],
      make: ['Arduino', Validators.required],
      model: ['Mega2560', Validators.required],
      input: ['FFBDFF77EFDFEC6F55FF3672BBFD7EFB6D5FD776', Validators.compose([
          Validators.required,
          Validators.minLength(40),
          Validators.maxLength(40),
          Validators.pattern('^[A-Fa-f0-9]+$')
      ])],
    });

    this.arduinoModels.sort(((a, b) => a < b ? -1 : 1));
  }

  onSubmit() {
    this.deviceService.register(this.device).subscribe(value => {
      console.log(value);
    });
  }

}
