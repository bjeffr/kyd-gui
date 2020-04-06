import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/device.model';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-device-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  user: User;
  devices: Array<Device>;
  loading = true;

  constructor(private userService: UserService,
              private deviceService: DeviceService) { }

  async ngOnInit() {
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });

    this.user = await this.userService.get();
    this.devices = await this.deviceService.getAll();
    this.loading = false;
  }
}
