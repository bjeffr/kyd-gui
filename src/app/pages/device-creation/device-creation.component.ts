import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';

@Component({
  selector: 'app-device-creation',
  templateUrl: './device-creation.component.html',
  styleUrls: ['./device-creation.component.scss']
})
export class DeviceCreationComponent implements OnInit {

  private device: FormGroup;
  private models = ['Uno WiFi', 'MKR1000', 'MKR Zero', '101', 'Zero', 'Due', 'Yún', 'Leonardo', 'Uno', 'Mega2560', 'Ethernet', 'Fio',
    'Nano', 'LilyPad', 'Pro', 'Mega ADK', 'Esplora', 'Micro', 'Pro Mini'];
  registered = false;

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService) { }

  ngOnInit() {
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    this.device = this.fb.group({
      model: [null, Validators.required],
      pufData: [null, Validators.compose([
        Validators.required,
        Validators.minLength(64),
        Validators.maxLength(64)])],
    });

    this.models.sort(((a, b) => a < b ? -1 : 1));

    this.device.valueChanges.subscribe(() => {
      console.log(this.device);
    });
  }

  onSubmit() {
    this.deviceService.create(this.device).subscribe(() => {
      this.registered = true;
    });
  }

}
