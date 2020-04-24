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
      name: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(255)
      ])],
      id: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])]
    });
  }

  onSubmit() {
    this.deploying = true;
    this.deviceService.register(this.device).then(() => {
      this.router.navigate(['']);
    });
  }
}
