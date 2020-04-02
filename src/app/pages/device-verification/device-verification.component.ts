import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-device-verification',
  templateUrl: './device-verification.component.html',
  styleUrls: ['./device-verification.component.scss']
})
export class DeviceVerificationComponent implements OnInit {

  private device: FormGroup;
  deploying = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private deviceService: DeviceService,
              private router: Router) { }

  ngOnInit() {
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    this.route.params.subscribe(params => {
      this.device = this.fb.group({
        id: [params.id, Validators.required],
        pufData: [null, Validators.compose([
          Validators.required,
          Validators.min(32),
          Validators.max(32)])]
      });
    });
  }

  onSubmit() {
    this.deploying = true;
    this.deviceService.verify(this.device).then(() => {
      this.router.navigate(['']);
    });
  }

}
