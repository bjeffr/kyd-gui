import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/device.model';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.scss']
})
export class DeviceOverviewComponent implements OnInit {

  devices: Array<Device>;
  userIcon = faUser

  constructor(private deviceService: DeviceService,
              private userService: UserService) { }

  ngOnInit() {
    this.deviceService.getAll().subscribe(value => {
      this.devices = value;
      console.log(this.devices);
    });
  }
}
