import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-device-registration',
  templateUrl: './device-registration.component.html',
  styleUrls: ['./device-registration.component.scss']
})
export class DeviceRegistrationComponent implements OnInit {

  private device: FormGroup;
  private userIcon = faUser;
  private arduinoModels = ['Uno WiFi', 'MKR1000', 'MKR Zero', '101', 'Zero', 'Due', 'Yún', 'Leonardo', 'Uno', 'Mega2560', 'Ethernet', 'Fio',
    'Nano', 'LilyPad', 'Pro', 'Mega ADK', 'Esplora', 'Micro', 'Pro Mini'];

  constructor(private fb: FormBuilder,
              private deviceService: DeviceService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.device = this.fb.group({
      name: [null, Validators.required],
      make: [null, Validators.required],
      model: [null, Validators.required],
      input: [null, Validators.compose([
          Validators.required,
          Validators.minLength(64),
          Validators.maxLength(64),
          Validators.pattern('^[A-Fa-f0-9]+$')
      ])],
    });

    this.arduinoModels.sort(((a, b) => a < b ? -1 : 1));
  }

  onSubmit() {
    this.deviceService.register(this.device).subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
