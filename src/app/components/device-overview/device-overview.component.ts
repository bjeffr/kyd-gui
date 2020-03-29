import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/device.model';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {

  devices: Array<Device>;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.updateDevices();
  }

  updateDevices() {
    // this.deviceService.getAll().subscribe(value => {
    //   this.devices = value;
    //   console.log(value);
    // });
  }
}
