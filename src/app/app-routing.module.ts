import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserRegistrationComponent} from './components/user-registration/user-registration.component';
import {DeviceOverviewComponent} from './components/device-overview/device-overview.component';
import {DeviceRegistrationComponent} from './components/device-registration/device-registration.component';
import {UserGuard} from './guards/user.guard';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: UserRegistrationComponent
  },
  {
    path: '',
    component: DeviceOverviewComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'device/register',
    component: DeviceRegistrationComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
