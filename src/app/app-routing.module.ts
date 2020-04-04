import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from './guards/user.guard';
import {LoginComponent} from './pages/login/login.component';
import {DeviceRegistrationComponent} from './pages/device-registration/device-registration.component';
import {UserRegistrationComponent} from './pages/user-registration/user-registration.component';
import {DeviceCreationComponent} from './pages/device-creation/device-creation.component';
import {DeviceVerificationComponent} from './pages/device-verification/device-verification.component';
import {UserRegistrationGuard} from './guards/user-registration.guard';
import {OverviewComponent} from './pages/overview/overview.component';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/register',
    component: UserRegistrationComponent,
    canActivate: [UserRegistrationGuard]
  },
  {
    path: '',
    component: OverviewComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'devices/:id/verify',
    component: DeviceVerificationComponent
  },
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
