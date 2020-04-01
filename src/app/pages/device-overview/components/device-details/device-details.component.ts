import {Component, Input, OnInit} from '@angular/core';
import {Device} from '../../../../models/device.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  @Input() device: Device;
  url = environment.etherScan;

  constructor() { }

  ngOnInit() { }

}
