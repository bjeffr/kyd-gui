import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-device-registration',
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.scss']
})
export class DeviceRegistrationComponent implements OnInit {

  private device: FormGroup;
  private arduinoModels = ['Uno WiFi', 'MKR1000', 'MKR Zero', '101', 'Zero', 'Due', 'Yún', 'Leonardo', 'Uno', 'Mega2560', 'Ethernet', 'Fio',
    'Nano', 'LilyPad', 'Pro', 'Mega ADK', 'Esplora', 'Micro', 'Pro Mini'];
  deploying = false;

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              private router: Router) { }

  ngOnInit() {
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    this.device = this.fb.group({
      name: [null, Validators.required],
      make: [null, Validators.required],
      model: [null, Validators.required]
    });

    this.arduinoModels.sort(((a, b) => a < b ? -1 : 1));
  }

  onSubmit() {
    this.deploying = true;
    this.deviceService.register(this.device).then(() => {
      this.router.navigate(['']);
    });
  }
}
