import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from './guards/user.guard';
import {LoginComponent} from './pages/login/login.component';
import {DeviceOverviewComponent} from './pages/device-overview/device-overview.component';
import {DeviceRegistrationComponent} from './pages/device-registration/device-registration.component';
import {UserRegistrationComponent} from './pages/user-registration/user-registration.component';
import {DeviceCreationComponent} from './pages/device-creation/device-creation.component';
import {DeviceVerificationComponent} from './pages/device-verification/device-verification.component';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users/register',
    component: UserRegistrationComponent,
    canActivate: [UserGuard]
  },
  {
    path: '',
    component: DeviceOverviewComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'devices/verify/:id',
    component: DeviceVerificationComponent },
  {
    path: 'devices/register',
    component: DeviceRegistrationComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'devices/create',
    component: DeviceCreationComponent
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
