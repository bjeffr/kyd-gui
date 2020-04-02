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
import { JwtModule } from '@auth0/angular-jwt';
import {MatExpansionModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {DeviceRegistrationComponent} from './pages/device-registration/device-registration.component';
import {LoginComponent} from './pages/login/login.component';
import {DeviceOverviewComponent} from './pages/device-overview/device-overview.component';
import {DeviceDetailsComponent} from './pages/device-overview/device-details/device-details.component';
import {DeviceVerificationComponent} from './pages/device-verification/device-verification.component';
import {UserRegistrationComponent} from './pages/user-registration/user-registration.component';
import {ParticularsComponent} from './pages/user-registration/components/particulars/particulars.component';
import { DeviceCreationComponent } from './pages/device-creation/device-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceRegistrationComponent,
    LoginComponent,
    DeviceOverviewComponent,
    DeviceDetailsComponent,
    DeviceVerificationComponent,
    UserRegistrationComponent,
    ParticularsComponent,
    DeviceCreationComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem('access_token');
                },
                whitelistedDomains: ['puf.dev.eng.c-alm.ch']
            }
        }),
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
