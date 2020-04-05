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
import {VerificationInstructionsComponent} from './pages/verification-instructions/verification-instructions.component';


const appRoutes: Routes = [
  {
    path: 'devices/create',
    component: DeviceCreationComponent
  },
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
    path: 'devices/register',
    component: DeviceRegistrationComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'devices/:id/verify/instructions',
    component: VerificationInstructionsComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'devices/:id/verify',
    component: DeviceVerificationComponent,
    canActivate: [UserGuard]
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
