import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  url = environment.etherScan;

  constructor() { }

  ngOnInit() { }

}
