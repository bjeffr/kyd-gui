import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AngularMaterialModule } from './angular-material.module';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {DeviceRegistrationComponent} from './pages/device-registration/device-registration.component';
import {LoginComponent} from './pages/login/login.component';
import {DeviceVerificationComponent} from './pages/device-verification/device-verification.component';
import {UserRegistrationComponent} from './pages/user-registration/user-registration.component';
import { DeviceCreationComponent } from './pages/device-creation/device-creation.component';
import {OverviewComponent} from './pages/overview/overview.component';
import {DeviceDetailsComponent} from './pages/overview/components/device-details/device-details.component';
import {UserDetailsComponent} from './pages/overview/components/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceRegistrationComponent,
    LoginComponent,
    OverviewComponent,
    DeviceDetailsComponent,
    DeviceVerificationComponent,
    UserRegistrationComponent,
    DeviceCreationComponent,
    UserDetailsComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularMaterialModule,
        FontAwesomeModule,
        MatSelectCountryModule,
        Ng2TelInputModule,
        MatPasswordStrengthModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatExpansionModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
